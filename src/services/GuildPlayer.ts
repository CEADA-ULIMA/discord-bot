import { SongInfo } from '@/interfaces';
import { DMChannel, NewsChannel, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import Player from './Player';

export class GuildPlayer {
  private songQueue: SongInfo[] = [];
  private guildVoiceChannel: VoiceChannel;
  private connection: VoiceConnection | null;

  constructor(voiceChannel: VoiceChannel) {
    this.guildVoiceChannel = voiceChannel;
    this.songQueue = [];
    this.connect();
  }

  private async connect() {
    try {
      this.connection = await this.guildVoiceChannel.join();
    } catch (err) {
      console.log(err);
      throw new Error('Could not be connected');
    }
  }

  public async play(channel: TextChannel | DMChannel | NewsChannel, query?: string) {
    let shouldStartPlayer = false;
    if (this.songQueue.length === 0) shouldStartPlayer = true;
    try {
      if (query){
        const song = await this.addSong(query);
        if (!shouldStartPlayer) {
          channel.send(`${song.title} - Added to the queue`);
        }
      }
      if (shouldStartPlayer) this.player(channel);
    } catch (err) {
      channel.send(err.message);
    }
  }

  public player(channel: TextChannel | DMChannel | NewsChannel) {
    const nextSong = this.songQueue[0];
    if (!nextSong) {
      this.guildVoiceChannel.leave();
    } else {
      const stream = Player.getStream(nextSong.url);
      this.connection!.play(stream, { volume: 0.8 }).on('finish', () => {
        this.songQueue.shift();
        this.player(channel);
      });
      channel.send(`Playing ${nextSong.title}`);
    }
  }

  public skip() {
    this.connection!.dispatcher.end();
  }

  public stop() {
    this.resetQueue();
    this.guildVoiceChannel.leave();
  }

  public getQueue() {
    return this.songQueue;
  }

  public resetQueue() {
    this.songQueue = [];
  }

  public async addSong(query: string) {
    try {
      const songInfo = await Player.getSongInfoByQuery(query);
      this.songQueue.push(songInfo);
      return songInfo;
    } catch (err) {
      console.log(err);
      throw new Error(`Something wrong happened ${query} NOT FOUND`);
    }
  }
}

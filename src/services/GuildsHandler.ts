import { VoiceChannel } from "discord.js";
import { GuildPlayer } from "./GuildPlayer";

class GuildsHandler {
  public guilds: Record<string, GuildPlayer>;

  constructor() {
    this.guilds = {};
  }

  public getGuild(id: string) {
    return this.guilds[id];
  }
  public addGuild(id: string, voiceChannel: VoiceChannel) {
    if (this.guilds[id]) throw new Error('Guild already exists');
    else {
      this.guilds[id] = new GuildPlayer(voiceChannel);
    }
  }
}

export default new GuildsHandler();

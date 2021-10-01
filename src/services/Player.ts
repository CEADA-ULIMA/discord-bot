import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';
import { SongInfo } from '@/interfaces';


class Player {
  public getStream(songUrl: string) {
    const stream = ytdl(songUrl, { filter: 'audioonly' });
    return stream;
  }

  public async getSongInfoByQuery(query: string): Promise<SongInfo> {
    try {
      const songUrl = await this.getSongUrl(query);
      const info = await this.getSongInfo(songUrl); 
      return info;
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong');
    }
  }

  public async getSongInfo(songUrl: string): Promise<SongInfo> {
    if (!ytdl.validateURL(songUrl)) throw new Error('Invalid URL');
    const songInfo = await ytdl.getInfo(songUrl);
    return {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    }
  }

  public async getSongUrl(song: string) {
    const isUrl = ytdl.validateURL(song);
    if (isUrl) return song;
    const response = await ytSearch(song);
    const firstSong = response.all[0];
    return firstSong.url;
  }
}


export default new Player();

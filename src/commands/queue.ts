import GuildsHandler from '../services/GuildsHandler';
import { Command } from '../interfaces';


const command: Command = {
  name: 'queue',
  aliases: ['q'],
  description: 'Show queue of songs',
  execute(msg) {
    const guildId = msg.guild?.id;
    if (guildId) {
      const guildPlayer = GuildsHandler.getGuild(guildId);
      if (guildPlayer) {
        const queue = guildPlayer.getQueue();
        let message = '';
        queue.forEach((song, index) => {
          message += `${++index} - ${song.title}\n`
        });
        msg.channel.send(message || 'Queue empty');
      }
    }
    return;
  }
}

export default command;

import GuildHandler from '../services/GuildsHandler';
import { Command } from '../interfaces';


const command: Command = {
  name: 'leave',
  aliases: [],
  description: 'Leave bot from a channel',
  async execute(msg) {
    const guildId = msg.guild?.id;
    if (guildId) {
      const guildPlayer = GuildHandler.getGuild(guildId);
      if (guildPlayer) {
        guildPlayer.stop();
      }
    }
  }
}

export default command;

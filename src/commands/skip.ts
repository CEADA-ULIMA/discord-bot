import GuildHandler from '../services/GuildsHandler';
import { Command } from '../interfaces';

const command: Command = {
  name: 'skip',
  aliases: [],
  description: 'Skip a song',
  async execute(msg) {
    const guildId = msg.guild?.id;
    if (guildId) {
      const guild = GuildHandler.getGuild(guildId);
      if (guild) {
        guild.skip();
      }
    }
  }
}

export default command;

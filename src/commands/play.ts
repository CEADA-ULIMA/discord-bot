import GuildHandler from '../services/GuildsHandler';
import { Command } from '../interfaces';

const command: Command = {
  name: 'play',
  aliases: ['p'],
  description: 'Muestra los comandos del bot',
  async execute(msg, args) {
    const query = args.join(' ');
    const guildId = msg.guild?.id;
    const voiceChannel = msg.member?.voice.channel;
    if (guildId && voiceChannel) {
      let guildPlayer = GuildHandler.getGuild(guildId);
      if (!guildPlayer) {
        GuildHandler.addGuild(guildId, voiceChannel);
        guildPlayer = GuildHandler.getGuild(guildId);
      }
      if (guildPlayer) {
        guildPlayer.play(msg.channel, query);
      }
    }
  }
}

export default command;

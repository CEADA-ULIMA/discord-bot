import { Command } from '@/interfaces';
import config from '../config';


const command: Command = {
  name: 'help',
  aliases: ['h'],
  description: 'Muestra los comandos del bot',
  execute(msg) {
    const response = `
    > Estos son los comandos soportados:
      \`${config.prefix}help\`: Lista los comandos disponibles.
      \`${config.prefix}random\`: Retorna un problema random de codeforces.

      \`${config.prefix}<command> help\`: Detalles del comando.
      `

    return msg.channel.send(response);
  }
}

export default command;

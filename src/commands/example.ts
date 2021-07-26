import { Command } from '@/interfaces';


const command: Command = {
  name: 'example',
  aliases: [],
  description: 'Ejemplo',
  execute(msg, _args) {
    return msg.channel.send('Hola');
  }
}


export default command;

import { CodeForcesResponse, Command } from '@/interfaces';
import { MessageEmbed } from 'discord.js';
import arg from 'arg';
import config from '../config';
import axios from 'axios';

const command: Command = {
  name: 'random',
  aliases: ['r'],
  description: 'Obtiene un problema random de codeforces',
  async execute(msg, args) {
    if (args.length == 0) return;

    const argsParser = arg(
      {
        '--rating': String,
        '--index': String,
        '--tags': [String],

        '-r': '--rating',
        '-i': '--index',
        '-t': '--tags',
      },
      { argv: args }
    );

    let url = `${config.CODEFORCES_API}problemset.problems/`;
    try {
      const res = await axios.get<CodeForcesResponse>(url, {
        params: {
          tags: argsParser['--tags']?.join(';'),
        },
      });
      let { problems } = res.data.result;

      let [rLower, rUpper] = argsParser['--rating']
        ? argsParser['--rating'].split('-').map(e => parseInt(e))
        : [800, 3000];
      let [iLower, iUpper] = argsParser['--index']
        ? argsParser['--index'].split('-')
        : ['A', 'E'];
      if (!rUpper) {
        rUpper = rLower;
      }
      if (!iUpper) {
        iUpper = iLower;
      }
      problems = problems.filter((problem) => {
        if (
          problem.index >= iLower &&
          problem.index <= iLower &&
          problem.rating >= rLower &&
          problem.rating <= rUpper
        ) {
          return problem;
        }
      });

      const idx = Math.floor(Math.random() * problems.length);
      const problem = problems[idx];

      const msgEmbed = new MessageEmbed()
        .setTitle(`${problem.index} ${problem.name}`)
        .setURL(`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`)
        .setDescription(`Rating: ${problem.rating}`)
        .addFields({
          name: 'tags', value: problem.tags.join(' '),
        })
        .setThumbnail('https://codeforces.org/s/72710/images/codeforces-logo-with-telegram.png');
      return msg.channel.send(msgEmbed);
    } catch (err) {
      return msg.channel.send('Hubo un error en el servidor');
    }
  },
};

export default command;

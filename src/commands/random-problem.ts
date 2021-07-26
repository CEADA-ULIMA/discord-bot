import { CodeForcesResponse, Command } from '@/interfaces';
import config from '../config';
import axios from 'axios';

const command: Command = {
  name: 'random',
  aliases: ['r'],
  description: 'Obtiene un problema random de codeforces',
  async execute(msg, args) {
    let url =  config.CODEFORCES_API + 'problemset.problems/';
    const res = await axios.get<CodeForcesResponse>(url, {
      params: {
        tags: args.join(' '),
      }
    });
    const { problems } = res.data.result;
    
    const idx = Math.floor(Math.random()*problems.length);
    const response = `
    https://codeforces.com/problemset/problem/${problems[idx].contestId}/${problems[idx].index}
    `
    return msg.channel.send(response);
  }
};

export default command;

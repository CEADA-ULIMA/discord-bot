import { Message } from 'discord.js';


export interface Command {
  name: string;
  aliases: string[];
  description: string;
  execute(msg: Message, args: string[]): void;
}

export interface CodeForcesProblem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  points: number;
  rating: number;
  tags: string[];
}

export interface CodeForcesProblemsStats {
  contestId: number;
  index: string;
  solvedCount: number;
}

export interface CodeForcesResponseResult {
  problems: CodeForcesProblem[];
  problemStatistics: CodeForcesProblemsStats[];
}

export interface CodeForcesResponse {
  status: string;
  result: CodeForcesResponseResult;
}

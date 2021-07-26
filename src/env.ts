import { config } from 'dotenv';
config();

export const {
  BOT_TOKEN,
  NODE_ENV = 'development',
} = process.env;

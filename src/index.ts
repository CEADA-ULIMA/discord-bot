import fs from 'fs';

import { CustomClient } from './models';
import config from './config';
import { BOT_TOKEN, NODE_ENV } from './env';

import { Command } from './interfaces';


const client = new CustomClient();

// Load commands
const fileExtension = NODE_ENV === 'production'? '.js' : '.ts';
const commandFiles = fs.readdirSync(__dirname + '/commands')
    .filter(file => file.endsWith(fileExtension));

for (const file of commandFiles) {
    const command: Command = require(`./commands/${file}`).default;
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    if (client.user) {
        client.user.setPresence({
            activity: { name: `Listening to ${config.prefix}help` }
        });
        console.log(`Logged in as ${client.user.tag}!`);
    }
});


client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args: string[] = msg.content.slice(config.prefix.length).trim().split(/ +/);
    let commandName: string | undefined = args.shift();
    if (!commandName) return;

    commandName = commandName.toLowerCase();

    const command: Command | undefined = client.commands.get(commandName)
        || client.commands.find((cmd): boolean => {
            if (!commandName) return false;
            return cmd.aliases.includes(commandName);
        });

    if (!command) return;

    try {
        command.execute(msg, args);
    } catch(err) {
        console.error(err);
        return msg.reply("Error trying to execute command!");
    }
});

client.login(BOT_TOKEN);

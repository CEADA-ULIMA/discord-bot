import { Client, Collection, ClientOptions } from 'discord.js'
import { Command } from '../interfaces';


/**
 * Represent a Discord client
 * @extends Discord.Client
 */
export class CustomClient extends Client {
    public commands: Collection<string, Command>;
    
    /**
     * @param {ClientOptions} options The opstions passed to the client
     */
    constructor(options?: ClientOptions) {
        // Initialise Discord.js Client with supplied client option
        super(options || {});
        /**
         * A collection of all of the bot's commands
         * @type {Discord.Collection}
         */
        this.commands = new Collection();
    }
}

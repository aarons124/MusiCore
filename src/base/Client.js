import { Client, Collection, GatewayIntentBits, Partials, ActivityType } from "discord.js";
import { registerPlayerEvents } from "../utils/handlers/PlayerEvents.js";
import { registerDiscordEvents } from "../utils/handlers/Events.js";
import { registerCommands } from "../utils/handlers/Commands.js";
import { config } from "dotenv";
import { CustomPlayer } from "../modules/Player.js";
config({ path: ".env" });

export class MusiCore extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
      ],
      partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.User,
        Partials.Channel
      ],
      presence: {
        status: "dnd",
        activities: [{
          name: 'under development',
          type: ActivityType.Playing
        }]
      }
    });

    this.commands = new Collection();
    this.player = new CustomPlayer(this);
    this.queues = new Collection();
  }

  async start() {
    await registerDiscordEvents(this);
    await registerPlayerEvents(this);
    await registerCommands(this);
    await this.player.extractors.loadDefault();
    await this.login(process.env.TOKEN);
  }
}
import { BaseInteraction, Events } from "discord.js";
import colors from "colors";

export default {
  name: Events.InteractionCreate,
  once: false,

  /**
   * @param {BaseInteraction} interaction
   */

  async execute(interaction) {
    const client = interaction.client;
    
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.inGuild()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await interaction.deferReply();
      
      await command.execute(interaction);
    } catch (error) {
      console.error(
        `${colors.blue(new Date().toLocaleString())} ${colors.red(
          "An error ocurred while executing a command:"
        )} ${colors.yellow(error.stack || error)}`
      );

    }

  }
}
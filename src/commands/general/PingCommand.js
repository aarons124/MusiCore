import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionsBitField } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with bot's ping!")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  /**
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const sent = await interaction.followUp({ content: "Pinging...", fetchReply: true });
    await interaction.editReply({ content: `💓 Websocket heartbeat: \`${Math.round(interaction.client.ws.ping)}ms\`\n⏱️ Api Latency: \`${Math.round(sent.createdTimestamp - interaction.createdTimestamp)}ms\`` });
  }
}
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { useMasterPlayer, QueryType } from 'discord-player';
import { EmbedBuilder } from 'discord.js';
import { Colors } from 'discord.js';
export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song')
    .addStringOption(option => option.setName('song').setDescription('The song to play').setRequired(true)),

  /**
 * @param {ChatInputCommandInteraction} interaction 
 */

  async execute(interaction) {
    const player = useMasterPlayer(interaction.client);

    const song = interaction.options.getString('song');
    const search = await player.search(song, {
      requestedBy: interaction.user,
    });

    if (search.isEmpty()) {
      return await interaction.followUp({
        content: 'No results were found!'
      })
    }

    try {
      await player.play(interaction.member.voice.channel, search, {
        nodeOptions: {
          metadata: interaction,
          selfDeaf: true,
          volume: 100,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 300000,
          leaveOnEnd: true,
          leaveOnEndCooldown: 300000,
        },
        requestedBy: interaction.user,
        searchEngine: QueryType.SPOTIFY_SEARCH
      });

      const queuedTrackEmbed = new EmbedBuilder()
        .setColor(Colors.White)
        .setDescription(`Queued [${search.tracks[0].title}](${search.tracks[0].url}) by [${search.tracks[0].author}](${search.tracks[0].url})!`)
      
      await interaction.editReply({
        embeds: [queuedTrackEmbed]
      });
  } catch(error) {
    await interaction.followUp({
      content: `An error occurred: ${error.message}`
    })
  }
}
}
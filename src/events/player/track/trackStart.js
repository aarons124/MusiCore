import { GuildQueue, Track } from "discord-player";
import { EmbedBuilder } from "discord.js";
import colors from "colors";

export default {
  name: 'playerStart',
  once: false,

  /**
   * @param {GuildQueue} queue
   * @param {Track} track
   */

  async execute(queue, track) {
    try {
      const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Now Playing')
        .setDescription(`[${track.title}](${track.url}) - ${track.author}`)
      queue.metadata.channel.send({ embeds: [embed] });
    } catch (error) {
      
    }
  }
}
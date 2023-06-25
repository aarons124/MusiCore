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

      queue.metadata.channel.send(`Started playing **${track.title}**!`);
    } catch (error) {
      
    }
  }
}
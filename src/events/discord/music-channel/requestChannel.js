import { Message, Events } from "discord.js";
import { useMasterPlayer } from "discord-player";

export default {
  name: Events.MessageCreate,
  once: false,

  /**
   * @param {Message} message
   */
  async execute(message) { 
    if (message.author.bot) return;

    const songRequestChannel = await message.guild.channels.cache.get("1120195282320228373");
    const player = useMasterPlayer(message.client);

    if (message.channel.id !== songRequestChannel.id) return;

    await songRequestChannel.messages.fetch({ cache: false }).then(async () => {
      console.log(message.content)
      const search = await player.search(message.content, {
        requestedBy: message.author,
      });

      await message.delete();

      try {
        await player.play(message.member.voice.channel, search, {
          nodeOptions: {
            metadata: message,
            selfDeaf: true,
            volume: 100,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 300000,
            leaveOnEnd: true,
            leaveOnEndCooldown: 300000,
          },
        });

        player.debug();
      } catch (error) {
        console.log(error);
      }
    });
  }
}
import { Player } from 'discord-player'

export class CustomPlayer extends Player {
  constructor(client) {
    super(client, {
      useLegacyFFmpeg: true,
      blockStreamFrom: ['youtube'],
      ytdlOptions: {
        highWaterMark: 1 << 25,
        quality: 'highestaudio',
      }
    });
  }
}
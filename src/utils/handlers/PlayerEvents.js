import { MusiCore } from "../../base/Client.js";
import { useMasterPlayer } from "discord-player";
import colors from "colors";
import fs from "fs/promises";
import path from "path";

/**
 * Register all events to Discord
 * @param {MusiCore} client 
 */
export async function registerPlayerEvents(client) {
  const player = useMasterPlayer();
  const eventsFolder = await fs.readdir(path.join("src", "events", "player"));

  for (const folder of eventsFolder) {
    const eventsFile = await fs.readdir(path.join("src", "events", "player", folder));

    for (const file of eventsFile) {
      if (!file.endsWith(".js")) continue;

      const eventDefault = await import(`../../events/player/${folder}/${file}`);
      const { default: event } = eventDefault;

      try {
        if (event.once) {
          client.player.events.on(event.name, (...args) => event.execute(...args));
        } else {
          client.player.events.on(event.name, (...args) => event.execute(...args));
        }
      } catch (error) {
        console.error(`Error importing event file ${file}:`, error);
      }
    }
  }

  console.log(`${colors.blue(new Date().toLocaleString())} ${colors.white("Player events loaded.")}`);
}

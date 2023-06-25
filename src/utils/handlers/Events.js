import { MusiCore } from "../../base/Client.js";
import colors from "colors";
import fs from "fs/promises";
import path from "path";
/**
 * Register all events to Discord
 * @param {MusiCore} client 
 */
export async function registerDiscordEvents(client) {
  const eventsFolder = await fs.readdir(path.join("src", "events", "discord"));

  for (const folder of eventsFolder) {
    const eventsFile = await fs.readdir(path.join("src", "events", "discord", folder));

    for (const file of eventsFile) {
      if (!file.endsWith(".js")) continue;

      const eventDefault = await import(`../../events/discord/${folder}/${file}`);
      const { default: event } = eventDefault;

      try {
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      } catch (error) { 
        console.error(`Error importing event file ${file}:`, error);
      }
    }
  }

  console.log(`${colors.blue(new Date().toLocaleString())} ${colors.white("Discord events loaded.")}`);
}

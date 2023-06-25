import { promises as fs } from "fs";
import { REST, Routes } from "discord.js";
import { MusiCore } from "../../base/Client.js";
import { config } from "dotenv";
import colors from "colors";
config({ path: ".env" });
import path from "path";

/**
 * Register all commands to Discord
 * @param {MusiCore} client Discord Client
 * @returns {Promise<void>}
 */
export async function registerCommands(client) {

  // Handle the commands
  const commands = [];
  const commandsFolder = await fs.readdir(path.join("src", "commands"));

  for (const folder of commandsFolder) {
    const commandsFiles = await fs.readdir(path.join("src", "commands", folder));
    const commandObjects = await Promise.all(
      commandsFiles.map((file) =>
        import(`../../commands/${folder}/${file}`).then((module) => module.default)
      )
    );

    for (const command of commandObjects) {
      try {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } catch (error) {
        console.error(`Error importing command file ${file}:`, error);
      }
    }
  }

  // Sync commands to Discord

  // Register commands to Discord
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log(
      `${colors.blue(new Date().toLocaleString())} ${colors.white(
        "Started refreshing application (/) commands."
      )}`
    );

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log(
      `${colors.blue(new Date().toLocaleString())} ${colors.white(
        "Successfully reloaded application (/) commands."
      )}`
    );
  } catch (error) {
    console.error(
      `${colors.blue(new Date().toLocaleString())} ${colors.red(
        "An error occurred while reloading application (/) commands."
      )}`,
      error
    );
  }
}

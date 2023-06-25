import { EmbedBuilder } from "discord.js";
import { WebhookClient } from "discord.js";

const webhook = new WebhookClient({
  id: process.env.ANTICRASH_WEBHOOK_ID,
  token: process.env.ANTICRASH_WEBHOOK_TOKEN
});

process.on('uncaughtException', async (error, origin) => { 
  await webhook.send({
    embeds: [
      new EmbedBuilder()
        .setColor('RED')
        .setDescription(`\`\`\`An uncaught exception occurred:\`\`\``)
        .addFields(
          [
            {
              name: 'Name',
              value: `\`\`\`${error.name}\`\`\``
            },
            {
              name: 'Origin',
              value: `${origin}`
            },
            {
              name: 'Message',
              value: `${error.message}`
            }
          ]
        )
    ]
  });

  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => { 
  await webhook.send({
    embeds: [
      new EmbedBuilder()
        .setColor('RED')
        .setDescription(`\`\`\`An unhandled rejection occurred:\`\`\``)
        .addFields(
          [
            {
              name: 'Unhandled Rejection at:',
              value: `\`\`\`${promise}\`\`\``
            },
            {
              name: 'Reason',
              value: `${reason}`
            }
          ]
        )
    ]
  });

  process.exit(1);
});
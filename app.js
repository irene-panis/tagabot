import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.DISCORD_TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
  if (msg.content === 'ping') {
    await msg.react('✅');
    console.log("reaction added");
  }
});

client.login(TOKEN);
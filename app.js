import 'dotenv/config';
import axios from 'axios';
import { Client, GatewayIntentBits } from 'discord.js';

const TOKEN = process.env.DISCORD_TOKEN;
const SPOTIFY_URL_REGEX = /https?:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)\?/;
const PLAYLIST_ID = process.env.PLAYLIST_ID;


const getSpotifyToken = async () => {
  try {
    var client_id = process.env.SPOTIFY_CLIENT;
    var client_secret = process.env.SPOTIFY_SECRET;
    
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    
    const response = await axios.post(authOptions);
      
    if (response && response.access_token) {
      return response.data.access_token;
    }
  } catch (error) {
  console.error('Error obtaining Spotify token:', error.message);
  }
  return null;
}

const addTrackToPlaylist = async (track) => {
  try {
    const token = await getSpotifyToken();
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
      { uris: [`spotify:track:${track}`] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Tracks added to playlist:', response.data);
  } catch (error) {
    console.error('Error adding tracks:', error.message);
  }
};



const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async msg => {
  const content = msg.content;
  
  const match = SPOTIFY_URL_REGEX.exec(content);
  if (match) {
    const trackId = match[1]; // Extract track ID from the regex match
    
    try {
      await addTrackToPlaylist(trackId);
      await msg.react('✅');
      console.log("Reaction added");
      console.log("Spotify track ID:", trackId);
    } catch (err) {
      console.log(err);
    }
  }
});

client.login(TOKEN);
// dependencies
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');

// express server
const app = express();
const port = process.env.PORT || 3000;

// discord variables
const TOKEN = process.env.DISCORD_TOKEN;
const THREAD_ID = process.env.THREAD_ID;

// spotify variables
const SPOTIFY_URL_REGEX = /https?:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)\?/;
const PLAYLIST_ID = process.env.PLAYLIST_ID;
const CLIENT_ID = process.env.SPOTIFY_CLIENT;
const CLIENT_SECRET = process.env.SPOTIFY_SECRET;
const SCOPES = ['playlist-modify-public', 'playlist-modify-private', 'user-read-private', 'user-read-email'];
const REDIRECT_URI = process.env.REDIRECT_URI;

// spotify api obj
const spotify = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
  scope: SCOPES
});

// prints auth url so we can navigate to it
const getAuthCode = async () => {
  const authorizeURL = spotify.createAuthorizeURL(SCOPES);
  console.log("Authorize URL: ", authorizeURL);
}

getAuthCode();

// GET request which collects code from redirect URI and sets access token
app.get('/auth-callback', async (req, res) => {
  try {
    const AUTH_CODE = req.query.code;
    const data = await spotify.authorizationCodeGrant(AUTH_CODE);
    spotify.setAccessToken(data.body['access_token']);
    spotify.setRefreshToken(data.body['refresh_token']);
    console.log("Auth successful");
    res.status(200).send('Authorization successful');
  } catch (err) {
    console.log('Something went wrong!', err);
    res.status(500).send('Internal Server Error');
  }
});

// refresh access token
const getSpotifyToken = async () => {
  try {
   const data = await spotify.refreshAccessToken();
   console.log('The access token has been refreshed!');
   spotify.setAccessToken(data.body['access_token']);
  } catch (error) {
    console.error('Error refreshing Spotify token:', error.message);
  }
  return null;
}

// add track to playlist func which refreshes token first then adds
const addTrackToPlaylist = async (track) => {
  try {
    await getSpotifyToken(); // refresh token
    const TRACK_URI = `spotify:track:${track}`;
    spotify.addTracksToPlaylist(PLAYLIST_ID, [TRACK_URI]);
    const TRACK_NAME = await spotify.getTrack(track);
    console.log(`Track added to playlist: ${TRACK_NAME.body.name}`);
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

// event handler for new messages in server
client.on('messageCreate', async msg => {
  if (msg.channel.id === THREAD_ID) {
    const content = msg.content;
    const match = SPOTIFY_URL_REGEX.exec(content);
    if (match) {
      const trackId = match[1]; // Extract track ID from the regex match   
      try {
        await addTrackToPlaylist(trackId);
        await msg.react('✅');
        console.log("Reaction added");
      } catch (err) {
        console.log(err);
      }
    }
  }
});

client.login(TOKEN);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
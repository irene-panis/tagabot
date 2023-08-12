# tagabot
## Summary
This is a simple Discord bot that I created for myself and my friends. Using Discord.js and the Spotify Web API, it scans incoming messages in a certain channel for Spotify track links, then takes those tracks and adds them to a specific playlist.

I made this bot to solve a really niche problem that we had: we have a collaborative playlist of songs that we like, but we always had to have someone manually add everyone's songs. With this bot in use, we can now just post links and let the bot do the adding.

![image](https://github.com/irene-panis/tagabot/assets/65985104/9dd47373-f739-4530-9bc1-07e3064868d4)

![image](https://github.com/irene-panis/tagabot/assets/65985104/0d60e35d-18f1-418d-ab95-8fca3ac16ad4)

## Technologies Used
- Node.js
- Express.js to handle server and read user auth
- [Discord.js](https://discord.js.org/) to create the bot and make it read messages
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) (specifically [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) npm package)
- dotenv for my one million environmental variables

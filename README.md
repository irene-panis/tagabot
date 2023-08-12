# tagabot
## Summary
This is a simple Discord bot that I created for myself and my friends. Using Discord.js and the Spotify Web API, it scans incoming messages in a certain channel for Spotify track links, then takes those tracks and adds them to a specific playlist.

I made this bot to solve a really niche problem that we had: we have a collaborative playlist of songs that we like, but we always had to have someone manually add everyone's songs. With this bot in use, we can now just post links and let the bot do the adding.

![image](https://github.com/irene-panis/tagabot/assets/65985104/9dd47373-f739-4530-9bc1-07e3064868d4)

![image](https://github.com/irene-panis/tagabot/assets/65985104/0d60e35d-18f1-418d-ab95-8fca3ac16ad4)

## Improvements
There are definitely ways to improve the flow of the app; right now I'm running the entire authorization/authentication flow every time the app launches which is obviously a hassle. Ideally I'd want to slash this and instead implement a system where the application can remember a user that has authorized it and be able to grab the correct access/refresh tokens for that user, so that the user only has to authorize once and be done with it. I am also considering implementing a check for if an access token is still valid so that the app doesn't have to refresh the token as much-- this would help in situations where requests are being made more than once per hour. At the end of the day it's still a pretty small and simple application that is only being used in one Discord server so I'm not too concerned about making it perfect just yet.

## Technologies Used
- Node.js
- Express.js to handle server and read user auth
- [Discord.js](https://discord.js.org/) to create the bot and make it read messages
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) (specifically [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) npm package)
- dotenv for my one million environmental variables

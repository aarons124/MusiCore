## About
MusiCore is a feature-rich and open-source Discord music bot written in JavaScript ES6. It leverages the power of the discord-player package for its robust music system and utilizes the discord.js library to interact seamlessly with the Discord API.

## Key Features
- High-Quality Music Playback: MusiCore provides smooth and reliable music playback, allowing users to enjoy their favorite tracks with excellent audio quality.

- Comprehensive Commands: The bot offers a wide range of commands, including play, pause, resume, skip, queue, volume control, and more, to enhance the music listening experience.

- Playlists and Queue Management: Users can create and manage playlists, add songs to the queue, shuffle the playlist, and dynamically control the order of tracks.

- Advanced Music Controls: MusiCore supports various advanced music controls like repeat, loop, seek, and seek to ensure users have complete control over their music playback.

- Rich User Experience: The bot offers additional features such as lyrics lookup, song information retrieval, and integration with music streaming platforms to enhance the overall user experience.

- Configurable and Customizable: MusiCore can be easily configured and customized to suit specific server requirements, allowing server administrators to fine-tune various settings according to their preferences.

## Installation

MusiCore is built on the principles of modularity, extensibility, and user-friendliness. Its clean and well-documented codebase makes it an ideal starting point for developers looking to contribute or build upon the existing functionality.

In order to run and test the bot locally, you need to have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/en/) (v16.x or higher)
- [Python](https://www.python.org/downloads/) 
- [FFmpeg](https://ffmpeg.org/download.html)

Once you have installed the above dependencies, you can follow the steps given below to install and run the bot:

## Environment Variables

The bot requires the following environment variables to be set in a `.env` file in the root directory:

```
TOKEN=
CLIENT_ID=
GUILD_ID=
OWNER_TAG=

SPOTIFY_ID=
SPOTIFY_SECRET=

YOUTUBE_ID=
YOUTUBE_COOKIE=

EMOTES (add your own or use the default ones)

FAIL_EMOJI=
SUCCESS_EMOJI=
LOAD_EMOJI=
```

## Running the Bot

Once you have installed the dependencies and set the environment variables, you can run the bot using the following command:

```bash
npm start
```



## Commands

The bot offers a wide range of commands to enhance the music listening experience. The commands are categorized into the following categories:

- Music Commands
- Queue Commands
- Playlist Commands
- Miscellaneous Commands

## Contributing
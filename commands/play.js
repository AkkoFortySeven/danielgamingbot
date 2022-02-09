const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const message = require('../events/guild/message');
const { joinVoiceChannel } = require('@discordjs/voice');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    description: 'some music innit',
    async execute(client, message, cmd, args, Discord)
    {
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Go into a channel you fuckface');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Give me your house keys');
        if (!permissions.has('SPEAK')) return message.channel.send('i cant sing');

        const server_queue = queue.get(message.guild.id);

        if (cmd === 'play')
        {
            if (!args.length) return message.channel.send('are you mental');
            let song = {};

            if (ytdl.validateURL(args[0]))
            {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else
            {
                const video_finder = async (query) => 
                {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video)
                {
                    song = { title: video.title, url: video.url }
                    
                } else
                {
                    message.channel.send('ive had a heart attack');
                }
            }

            if (!server_queue)
        {
            const queue_constructor = {
                voice_channel: voice_channel,
                text_channel: message.channel,
                connection: null,
                songs: []
            }

            queue.set(message.guild.id, queue_constructor);
            queue_constructor.songs.push(song);

            try {
                // joinVoiceChannel({
                //     channelId: message.member.voice.channel.id,
                //     guildId: message.guild.id,
                //     adapterCreator: message.guild.voiceAdapterCreator
                // })

                const connection = await voice_channel.join();
                queue_constructor.connection = connection;
                video_player(message.guild, queue_constructor.songs[0]);
            } catch (err) {
                queue.delete(message.guild.id);
                message.channel.send('ive fallen down the stairs');
                throw err;
            }
        } else 
        {
            server_queue.songs.push(song);
            return message.channel.send(`**${song.title}** has been added to the queue`);
        }
        }

        if (cmd === 'stop')
        {
            voice_channel.leave();
            queue.delete(message.guild.id);
        }

        /*
        if (cmd === 'skip')
        {
            var keys = Array.from(queue.keys()).slice(0, 1);
            keys.forEach(k => queue.delete(k));

            keys.sort();

            


            //message.guild.id.songs.shift();
            
        }
        */

        
    }
}


const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
        const stream = ytdl(song.url, {filter: 'audioonly' });
        song_queue.connection.play(stream, { seek: 0, volume: 0.5})
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });

        await song_queue.text_channel.send('thanks brother heres wonderwall')
}

// const video_stopper = async (guild) => {
//     guild.
// }
const Discord = require("discord.js")
require("dotenv").config()


const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "DIRECT_MESSAGES"
    ],
    partials: [
        'CHANNEL',
    ]
})


const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

/*
client.on("messageCreate", message => {
    if (message.content == "hi"){
        message.reply("Fuck you ed sheeran");
    }
})
*/

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for (const file of commandFiles)
// {
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command);
// }


// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate", (message) => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === 'bing'){
//         client.commands.get('bing').execute(message, args);
//     } else if (command === 'magnumopus'){
//         client.commands.get('magnumopus').execute(message, args);
//     }
// })

client.on("messageCreate", messageCreate => {
     if (messageCreate.content == "hi"){
         messageCreate.reply("Fuck you Ed Sheeran")
     }
 })

 client.on('messageCreate', async message => {
    if (messageCreate.channel.partial)
    {
        messageCreate.reply("I don't give a shit");
    }
 });

const welcomingChannelID = "673464884318437409"

client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomingChannelID).send(`<@${member.id}> Who the fuck are you`)
})



client.login(process.env.TOKEN)
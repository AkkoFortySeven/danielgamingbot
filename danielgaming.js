const Discord = require("discord.js")
require("dotenv").config()


const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Fuck you Ed Sheeran")
    }
})

const welcomingChannelID = "200120357095604225"

client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomingChannelID).send(`<@${member.id}> Who the fuck are you`)
})

client.login(process.env.TOKEN)
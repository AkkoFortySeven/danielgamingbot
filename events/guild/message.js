require('dotenv').config();
module.exports = (client, Discord, messageCreate) => {
    const prefix = process.env.PREFIX;
    if (!messageCreate.content.startsWith(prefix) || messageCreate.author.bot) return;

    const args = messageCreate.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (command) command.execute(client, messageCreate, cmd, args, Discord);
}
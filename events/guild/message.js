require('dotenv').config();
module.exports = (client, Discord, messageCreate) => {
    const prefix = process.env.PREFIX;
    const snuffleID = process.env.SNUFFLE;
    /*
    if (messageCreate.content == 'hi')
    {
        messageCreate.reply('fuck you ed sheeran');
    }
    */

    

    if (messageCreate.channel.type == 'dm' && !messageCreate.author.bot)
    {
        var messageContent = messageCreate.content;
        client.users.fetch(snuffleID, false).then((user) => {
            //console.log(user);
            user.send(`Message from ${messageCreate.author}: ${messageContent}`);
        })
        //messageCreate.channel.send(`i don't give a shit`);
    
    }
    if (!messageCreate.content.startsWith(prefix) || messageCreate.author.bot) return;

    const args = messageCreate.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (command) command.execute(client, messageCreate, cmd, args, Discord);

    
}
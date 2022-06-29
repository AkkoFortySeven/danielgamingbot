const message = require("../events/guild/message");

module.exports = {
    name: 'harrassment',
    aliases: 'dox, leakedinfo',
    description: 'sends the bot to harass someone',
    execute(client, messageCreate, cmd, args) 
    {
        //messageCreate.channel.bulkDelete(1);

        if (!args[0]) return messageCreate.reply("i'm going to find you")
        var targetUserID = args[0].slice(2, args[0].length - 1);
        var messageContent = args.slice(1).join(' ');
        if (!args[1]) return messageCreate.reply("i'm going to find you");



        client.users.fetch(targetUserID, false).then((user) => {
            user.send(`${messageContent}`);
        })
        
        

    }

}
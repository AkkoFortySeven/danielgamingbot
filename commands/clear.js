const message = require("../events/guild/message");

module.exports = {
    name: 'clear',
    aliases: 'delete, fuckoff',
    description: 'deletes amount of messages specified',
    execute(client, messageCreate, cmd, args)
    {
        if (!args[0]) return messageCreate.reply("fuck you")
        messageCreate.channel.bulkDelete(args[0]);
    }

}
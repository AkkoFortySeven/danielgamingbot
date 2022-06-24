const message = require('../events/guild/message');

module.exports = {
    name: 'echo',
    description: 'echo message content in specified channel',
    execute(client, messageCreate, cmd, args)
    {
        var messageContent = messageCreate.content.slice(5);
        messageCreate.channel.bulkDelete(1);
        messageCreate.channel.send(messageContent);
    }
}
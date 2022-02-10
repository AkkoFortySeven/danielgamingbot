const message = require('../events/guild/message');

module.exports = {
    name: 'echo',
    description: 'echo message content in specified channel',
    execute(client, messageCreate, cmd, args)
    {
        const targetChannel = '940463032469958666'
        messageCreate.targetChannel.send(message.conent);
    }
}
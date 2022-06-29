const message = require('../events/guild/message');

module.exports = {
    name: 'echo',
    description: 'echo message content in specified channel',
    execute(client, messageCreate, cmd, args)
    {
        
        var messageContent = messageCreate.content.slice(5);
        
        
        messageCreate.channel.bulkDelete(1);
        /*
        if (messageCreate.attachments.first())
        {
            if (messageCreate.attachments.first().filename === 'jpg')
            {
                download(messageCreate.attachments.first())
            }


            messageCreate.channel.send({
                files: [{
                    attachment: messageCreate.attachment,
                    name: 'bot_message.jpg'
                }]
            })
            return;
        }
        */
        messageCreate.channel.send(messageContent);
    }
}
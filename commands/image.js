const message = require("../events/guild/message")

module.exports = {
    name: 'image',
    description: 'post an image you fat fuck',
    execute(client, messageCreate, cmd, args)
    {
        messageCreate.channel.bulkDelete(1);
        messageCreate.channel.send({
            files: [{
                attachment: 'joey in the room.jpg',
                name: 'im_watching_you.jpg'
            }]
        })

    }
}
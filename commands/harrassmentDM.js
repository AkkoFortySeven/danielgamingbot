const message = require("../events/guild/message");

module.exports = {
    name: 'harrassmentDM',
    aliases: 'doxDM, leakedinfoDM',
    description: 'sends the bot to harass someone',
    execute(client, messageCreate, cmd, args) 
    {
        
        if (!args[0]) return messageCreate.reply("i'm going to find you")
        var targetUserID = args[0].slice(2, args[0].length - 1);
        var messageContent = args.slice(1).join(' ');


        console.log("i farted");
        client.users.fetch(targetUserID, false).then((user) => {
            user.send({
                files: [{
                    attachment: 'joey in the room.jpg',
                    name: 'im_watching_you.jpg'
                }]
            });
        })
        
        
        

    }

}
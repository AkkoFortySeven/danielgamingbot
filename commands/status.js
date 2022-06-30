module.exports = {
    name: 'status',
    aliases: 'activity, setGame',
    description: 'set the activity of the bot',
    execute(client, messageCreate, cmd, args)
    {
        
        var messageContent = args.slice(0).join(' ');
        console.log("Setting status to " + messageContent);

        client.user.setActivity(messageContent, { type: 'PLAYING'});
        //client.user.setActivity(messageContent);
        
    }
}
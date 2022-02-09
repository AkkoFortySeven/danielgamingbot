module.exports = {
    name: 'bing',
    aliases: ['bung', 'bang'],
    description: "bongs",
    execute(client, messageCreate, cmd, args)
    {
        messageCreate.channel.send('bong');
    }
}
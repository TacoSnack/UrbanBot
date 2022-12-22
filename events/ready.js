const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity('your cities grow | /invite', { type: ActivityType.Watching })
        console.log(`Logged in as ${client.user.tag}!`);
    },
}
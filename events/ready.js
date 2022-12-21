const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity('your cities grow | /invite', { type: 'WATCHING' });
        console.log(`Logged in as ${client.user.tag}!`);
    },
};
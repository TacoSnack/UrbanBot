const { Events } = require('discord.js');
const { clientID } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (!message.mentions.has(clientID)) return;

        return message.reply('Hi there! You can create your city with `/found`!!!');
    }
}
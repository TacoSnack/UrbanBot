const { Events, PermissionsBitField } = require('discord.js');
const { clientID } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        try {
            if (message.author.bot) return;
            if (!message.mentions.has(clientID)) return;
            if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return;

            return message.reply('Hi there! You can create your city with `/found`!!!');
        } catch (error) {
            console.error(error);
        }
    }
}
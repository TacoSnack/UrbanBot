const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('carrd')
        .setDescription('View UrbanBot\'s Carrd'),
    async execute(interaction) {
        return interaction.reply('View UrbanBot\'s Carrd here: <https://urbanbot.carrd.co>');
    }
}
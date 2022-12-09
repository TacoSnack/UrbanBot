const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Join the UrbanBot support server!'),
    async execute(interaction) {
        return interaction.reply('Join the UrbanBot support server here: https://discord.gg/XuZNNJbf4U');
    }
}
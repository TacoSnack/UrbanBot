const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('policies')
        .setDescription('View your city\'s policies'),
    async execute(interaction) {
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            return interaction.reply('No policies are available yet.');
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
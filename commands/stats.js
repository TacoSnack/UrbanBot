const { SlashCommandBuilder } = require('discord.js');
const { Cities } = require('../models/cities.js');
const commaNumber = require('comma-number');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('View UrbanBot\'s stats'),
    async execute(interaction) {
        const f = (number) => commaNumber(number);
        const cityCount = await Cities.count();

        return interaction.reply(`UrbanBot is on **${f(interaction.client.guilds.cache.size)}** servers and **${f(cityCount)}** cities have been created!`);
    }
}
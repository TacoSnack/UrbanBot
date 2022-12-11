const { SlashCommandBuilder } = require('discord.js');
const { Cities } = require('../models/cities.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('View UrbanBot\'s stats'),
    async execute(interaction) {
        const cityCount = await Cities.count();

        return interaction.reply(`UrbanBot is on ${interaction.client.guilds.cache.size} servers and ${cityCount} cities have been created!`);
    }
}
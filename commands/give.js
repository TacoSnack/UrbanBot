const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('temp command'),
    async execute(interaction) {
        const city = await Cities.findOne({
            attributes: ['userId', 'balance', 'resources'],
            where: { userId: interaction.user.id },
        });

        await city.increment({
            'balance': 10000,
            'resources': 10000,
        });
        return interaction.reply('success');
    }
}
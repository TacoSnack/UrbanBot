const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('pls work'),
    async execute(interaction) {
        const city = await Cities.findOne({
            attributes: ['userId', 'safety'],
            where: { userId: interaction.user.id },
        });

        await interaction.reply(`${city.safety}`);
    }
}
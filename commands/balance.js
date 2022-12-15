const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');
const commaNumber = require('comma-number');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('View your city\'s balance and resources'),
    async execute(interaction) {
        const f = (number) => commaNumber(number);
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const cityBalance = await Cities.findOne({
                attributes: ['userId', 'balance', 'resources'],
                where: { userId: interaction.user.id },
            });

            return interaction.reply(`You have **$${f(cityBalance.balance)}** and **${f(cityBalance.resources)}** resources!`)
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
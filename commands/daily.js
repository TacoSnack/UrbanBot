const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');
const commaNumber = require('comma-number');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Collect your daily reward!'),
    async execute(interaction) {
        const f = (number) => commaNumber(number);
        const cityExists = await Cities.findByPk(interaction.user.id);
        const cooldown = interaction.client.dailyCooldown;

        if (cityExists) {
            if (cooldown.has(interaction.user.id)) return interaction.reply({ content: 'You can only claim your daily reward once per day!', ephemeral: true });

            const cityBalance = await Cities.findOne({
                attributes: ['userId', 'balance', 'resources', 'commercialLevel', 'industrialLevel'],
                where: { userId: interaction.user.id },
            });

            const newBalance = {
                balance: cityBalance.commercialLevel * 1000,
                resources: cityBalance.industrialLevel * 900,
            }

            await cityBalance.increment({
                'balance': newBalance.balance,
                'resources': newBalance.resources,
            });

            await interaction.reply(`You collected your daily reward and earned **$${f(newBalance.balance)}** and **${f(newBalance.resources)}** resources!`);

            cooldown.set(interaction.user.id, true);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, 8.64e7);
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const commaNumber = require('comma-number');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('View the top 10 cities!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('happiness')
                .setDescription('View the top 10 cities based on happiness!')
        ),
    async execute(interaction) {
        const f = (number) => commaNumber(number);

        if (interaction.options.getSubcommand() === 'happiness') {
            const cities = await Cities.findAll({
                attributes: ['name', 'happiness'],
                order: [['happiness', 'DESC']],
            });

            const happinessEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle('Leaderboard | Happiness')
                .setDescription('Here are the top 10 cities:')
                .addFields(
                    { name: `1st: ${cities[0].name}`, value: `Happiness: \`${f(cities[0].happiness)}\`` },
                    { name: `2nd: ${cities[1].name}`, value: `Happiness: \`${f(cities[1].happiness)}\`` },
                    { name: `3rd: ${cities[2].name}`, value: `Happiness: \`${f(cities[2].happiness)}\`` },
                    { name: `4th: ${cities[3].name}`, value: `Happiness: \`${f(cities[3].happiness)}\`` },
                    { name: `5th: ${cities[4].name}`, value: `Happiness: \`${f(cities[4].happiness)}\`` },
                    { name: `6th: ${cities[5].name}`, value: `Happiness: \`${f(cities[5].happiness)}\`` },
                    { name: `7th: ${cities[6].name}`, value: `Happiness: \`${f(cities[6].happiness)}\`` },
                    { name: `8th: ${cities[7].name}`, value: `Happiness: \`${f(cities[7].happiness)}\`` },
                    { name: `9th: ${cities[8].name}`, value: `Happiness: \`${f(cities[8].happiness)}\`` },
                    { name: `10th: ${cities[9].name}`, value: `Happiness: \`${f(cities[9].happiness)}\`` },
                );

            return interaction.reply({ embeds: [happinessEmbed] });
        }
    }
}
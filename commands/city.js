const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const commaNumber = require('comma-number');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('city')
        .setDescription('View your city'),
    async execute(interaction) {
        const f = (number) => commaNumber(number);
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const city = await Cities.findOne({
                attributes: ['userId', 'name', 'happiness', 'population', 'balance', 'resources', 'crowdedness', 'traffic', 'pollution'],
                where: { userId: interaction.user.id },
            });

            const cityEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(`${city.name} | Stats`)
                .setDescription('Here are your city\'s stats:')
                .addFields(
                    { name: '๐ Happiness:', value: `${f(city.happiness)}` },
                    { name: '๐ง Population:', value: `${f(city.population)}` },
                    { name: '๐ต Balance:', value: `$${f(city.balance)}` },
                    { name: '๐ชจ Resources:', value: `${f(city.resources)}` },
                    { name: '๐จโ๐ฉโ๐งโ๐ฆ Crowdedness:', value: `${f(city.crowdedness)}` },
                    { name: '๐ Traffic:', value: `${f(city.traffic)}` },
                    { name: '๐ข๏ธ Pollution:', value: `${f(city.pollution)}` },
                );

            return interaction.reply({ embeds: [cityEmbed] });
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
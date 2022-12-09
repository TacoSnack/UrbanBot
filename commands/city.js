const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('city')
        .setDescription('View your city!'),
    async execute(interaction) {
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const city = await Cities.findOne({
                attributes: ['name', 'happiness', 'population', 'balance', 'resources', 'crowdedness', 'traffic', 'pollution'],
                where: { userId: interaction.user.id },
            });

            const cityEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(city.name)
                .setDescription('Here are your city\'s stats:')
                .addFields(
                    { name: '😄 Happiness:', value: `${city.happiness}` },
                    { name: '🧍 Population:', value: `${city.population}` },
                    { name: '💵 Balance:', value: `${city.balance}` },
                    { name: '🪨 Resources:', value: `${city.resources}` },
                    { name: '👨‍👩‍👧‍👦 Crowdedness:', value: `${city.crowdedness}` },
                    { name: '🚗 Traffic:', value: `${city.traffic}` },
                    { name: '🛢️ Pollution:', value: `${city.pollution}` },
                );

            return interaction.reply({ embeds: [cityEmbed] });
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
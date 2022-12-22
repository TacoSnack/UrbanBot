const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('found')
        .setDescription('Found your city!')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The name of your city!')
                .setRequired(true)
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');

        const cityAlreadyExists = await Cities.findByPk(interaction.user.id);

        if (!cityAlreadyExists) {
            const city = await Cities.create({
                userId: interaction.user.id,
                name: name,
            });

            const cityEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(`${city.name} | Stats`)
                .setDescription('Here are your city\'s stats:')
                .addFields(
                    { name: '😄 Happiness:', value: `${city.happiness}` },
                    { name: '🧍 Population:', value: `${city.population}` },
                    { name: '💵 Balance:', value: `$${city.balance}` },
                    { name: '🪨 Resources:', value: `${city.resources}` },
                    { name: '👨‍👩‍👧‍👦 Crowdedness:', value: `${city.crowdedness}` },
                    { name: '🚗 Traffic:', value: `${city.traffic}` },
                    { name: '🛢️ Pollution:', value: `${city.pollution}` },
                );

            return interaction.reply({ content: 'Your city has been created!', embeds: [cityEmbed] });
        } else {
            return interaction.reply('Your city already exists!');
        }
    }
}
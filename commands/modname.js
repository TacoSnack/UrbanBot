const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modname')
        .setDescription('STAFF ONLY')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The target city name')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.user.id !== '768584481795342356') return interaction.reply({ content: 'This is a staff only command!', ephemeral: true });

        const targetCityName = interaction.options.getString('name');

        await Cities.update({ name: 'Moderated Name' }, {
            where: { name: targetCityName }
        });

        return interaction.reply({ content: 'Moderated user\'s city name.', ephemeral: true });
    }
}
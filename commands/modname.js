const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');
const { moderators } = require('../config.json');

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
        if (!moderators.includes(interaction.user.id)) return interaction.reply({ content: 'This is a staff only command!', ephemeral: true });

        const targetCityName = interaction.options.getString('name');

        const targetCityExists = await Cities.findOne({
            where: { name: targetCityName },
        });

        if (targetCityExists) {
            await Cities.update({ name: 'Moderated Name' }, {
                where: { name: targetCityName }
            });
        } else {
            return interaction.reply({ content: 'This city name is misspelled.', ephemeral: true });
        }

        console.log(`Staff command used! "${targetCityName}" has been moderated by ${interaction.user.id}.`)

        return interaction.reply({ content: 'Moderated user\'s city name.', ephemeral: true });
    }
}
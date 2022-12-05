const { Tags } = require('../models/tag.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('Show a tag.')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The name of the tag')
                .setRequired(true)
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');

        const tag = await Tags.findOne({where: { name: name } });

        if (!tag) return interaction.reply('That tag doesn\'t exist!');

        return interaction.reply(tag.get('description'));
    }
}
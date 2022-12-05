const { Tags } = require('../models/tag.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtag')
        .setDescription('Create a tag!')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The name of your tag')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('The tag description')
                .setRequired(true)
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');

        try {
            const tag = await Tags.create({
                name: name,
                description: description,
            });

            return interaction.reply(`Tag \`${tag.name}\` created.`);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') return interaction.reply('That tag already exists!');

            await interaction.reply({ content: 'An error occured.', ephemeral: true });
            return console.error(error);
        }
    }
}
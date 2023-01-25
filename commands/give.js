const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('STAFF ONLY')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('the target user')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('money')
                .setDescription('The amount of money')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('resources')
                .setDescription('The amount of resources')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.user.id !== '768584481795342356') return interaction.reply({ content: 'This is a staff only command!', ephemeral: true });

        const targetUser = interaction.options.getUser('user');
        const moneyAmount = interaction.options.getString('money');
        const resourcesAmount = interaction.options.getString('resources');

        const city = await Cities.findOne({
            attributes: ['userId', 'balance', 'resources'],
            where: { userId: targetUser.id },
        });

        await city.increment({
            'balance': moneyAmount,
            'resources': resourcesAmount,
        });

        console.log(`Staff command used! $${moneyAmount} and ${resourcesAmount} resources have been given to ${targetUser.id} by ${interaction.user.id}.`);

        return interaction.reply('Money/resources has been awarded!');
    }
}
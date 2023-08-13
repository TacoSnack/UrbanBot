const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Vote for UrbanBot on Top.gg!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('link')
                .setDescription('Vote for UrbanBot on Top.gg!')    
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('claim')
                .setDescription('Claim your reward for voting on Top.gg!')
        ),
    async execute(interaction) {
        const cityExists = await Cities.findByPk(interaction.user.id);
        const cooldown = interaction.client.voteCooldown;

        if (interaction.options.getSubcommand() === 'link') {
            return interaction.reply('Vote for UrbanBot here: <https://top.gg/bot/1025198176547909693/vote>');
        } else if (interaction.options.getSubcommand() === 'claim') {
            if (cityExists) {
                if (!cooldown.has(interaction.user.id)) return interaction.reply('You haven\'t voted yet! Vote for UrbanBot here: <https://top.gg/bot/1025198176547909693/vote>');

                const cityBalance = await Cities.findOne({
                    attributes: ['userId', 'balance', 'resources'],
                    where: { userId: interaction.user.id },
                });

                await cityBalance.increment({
                    'balance': 10000,
                    'resources': 9000,
                });

                await interaction.reply('Thank you for voting! You claimed your reward of **$10,000** and **9,000** resources!');

                cooldown.delete(interaction.user.id);
            } else {
                return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
            }
        }
    }
}
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('View the commands and info'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x73a0d0)
            .setTitle('Help and Info')
            .setDescription('Join the [support server](https://discord.gg/XuZNNJbf4U) for help.')
            .addFields(
                { name: 'Start your city:', value: '/found, /city, /invite, /support' },
                { name: 'Make money:', value: '/collect, /daily, /vote' },
                { name: 'View your city:', value: '/balance, /zones, /services, /buildings' },
                { name: 'Upgrade your city:', value: '/upgrade, /build' },
                { name: 'View bot info:', value: '/leaderboard, /stats, /help, /carrd' },
            );

        return interaction.reply({ embeds: [helpEmbed] });
    }
}
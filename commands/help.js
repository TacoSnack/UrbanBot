const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('View the commands and info'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x73a0d0)
            .setTitle('Help and Info')
            .setDescription('Join the [support server](https://discord.gg/XuZNNJbf4U) for extra help.')
            .addFields(
                { name: '/found', value: 'Found your city!' },
                { name: '/city', value: 'View your city.' },
                { name: '/invite', value: 'Invite UrbanBot to your server!' },
                { name: '/collect', value: 'Collect your citizens\' taxes.' },
                { name: '/daily', value: 'Collect your daily reward!' },
                { name: '/zones, /services, /buildings', value: 'View your city\'s zones, services, and buildings.' },
                { name: '/upgrade zone, /upgrade service, /build', value: 'Upgrade/build your city\'s zones, services, or buildings.' },
                { name: '/leaderboard', value: 'View the top 10 best cities!' },
                { name: '/stats', value: 'View UrbanBot\'s stats!' },
            );

        return interaction.reply({ embeds: [helpEmbed] });
    }
}
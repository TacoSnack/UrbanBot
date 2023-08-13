const { Events, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { clientID } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(client, message) {
        try {
            if (message.author.bot) return;
            if (!message.mentions.has(clientID)) return;
            if (!message.channel.permissionsFor(client.user).has(PermissionsBitField.Flags.SendMessages)) return;

            const mentionEmbed = new EmbedBuilder()
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

            return message.reply({ content: 'Hi there! You can create your city with `/found`!!!', embeds: [mentionEmbed] });
        } catch (error) {
            console.error(error);
        }
    }
}
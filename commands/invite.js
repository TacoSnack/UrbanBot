const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite UrbanBot to your server!!!'),
    async execute(interaction) {
        return interaction.reply('Invite UrbanBot here: \n https://discord.com/oauth2/authorize?client_id=1025198176547909693&scope=bot&permissions=277025769536');
    }
}
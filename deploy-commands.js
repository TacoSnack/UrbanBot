const fs = require('node:fs');
const { REST, Routes } = require('discord.js');
const { clientID, guildID, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Refreshing ${commands.length} commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} commands.`);
    } catch (error) {
        console.error(error);
    }
})();
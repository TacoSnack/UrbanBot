const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { AutoPoster } = require('topgg-autoposter');
const { token, topggToken, webhookAuth } = require('./config.json');
const { Webhook } = require('@top-gg/sdk');
const app = require('express')();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.collectCooldown = new Collection();
client.dailyCooldown = new Collection();
client.voteCooldown = new Collection();

if (topggToken !== 'TEST' && webhookAuth !== 'TEST') {
    const ap = AutoPoster(topggToken, client);

    ap.on('posted', (stats) => {
        console.log(`Successfully posted bot stats to Top.gg, UrbanBot is on ${stats.serverCount} servers.`);
    });

    const dblWebhook = new Webhook(webhookAuth);

    app.post('/dblwebhook', dblWebhook.listener(vote => {
        console.log(`User voted on Top.gg! (id: ${vote.user})`);

        client.voteCooldown.set(vote.user, true);
    }));

    app.listen(8087, () => {
        console.log('Top.gg vote webhook is listening on port 8087!');
    });
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

client.login(token);
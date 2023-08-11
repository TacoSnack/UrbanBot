const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const commaNumber = require('comma-number');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collect')
        .setDescription('Collect your citizens\' taxes'),
    async execute(interaction) {
        const f = (number) => commaNumber(number);
        const cityExists = await Cities.findByPk(interaction.user.id);
        const cooldown = interaction.client.collectCooldown;

        if (cityExists) {
            if (cooldown.has(interaction.user.id)) return interaction.reply({ content: 'You can only collect taxes every **10 minutes**!', ephemeral: true });

            const city = await Cities.findOne({
                attributes: ['userId', 'name', 'happiness', 'population', 'balance', 'resources', 'crowdedness', 'traffic', 'pollution', 'residentialLevel', 'commercialLevel', 'industrialLevel', 'roadLevel', 'busLevel', 'parkLevel', 'plazasBuilt', 'busStationsBuilt'],
                where: { userId: interaction.user.id },
            });

            const newStats = {
                population: Math.floor(city.population + city.residentialLevel * 1000),
                balance: Math.floor(city.balance + city.commercialLevel * 150),
                resources: Math.floor(city.resources + city.industrialLevel * 100),
//              safety: Math.floor(city.safety + city.policeLevel * 5 + city.fireLevel * 5 + city.hospitalLevel * 11),
                crowdedness: Math.floor((city.residentialLevel * 95 - (city.parkLevel * 20 + city.plazasBuilt * 15)) / 10),
                traffic: Math.floor((city.commercialLevel * 90 - (city.roadLevel * 6 + city.busLevel * 12 + city.busStationsBuilt * 6)) / 10),
                pollution: Math.floor((city.industrialLevel * 95 - (city.busLevel * 15 + city.parkLevel * 20)) / 10),
            }

            const newTotalHappiness = Math.floor((newStats.population / 8) + (newStats.balance / 1.5) + newStats.resources - newStats.crowdedness - newStats.traffic - newStats.pollution);

            const changes = {
                population: newStats.population - city.population,
                balance: newStats.balance - city.balance,
                resources: newStats.resources - city.resources,
                crowdedness: newStats.crowdedness - city.crowdedness,
                traffic: newStats.traffic - city.traffic,
                pollution: newStats.pollution - city.pollution,
                happiness: newTotalHappiness - city.happiness,
            }

            const newCityEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(`${city.name} | Stats`)
                .setDescription('Here are your city\'s stats:')
                .addFields(
                    { name: '😄 Happiness:', value: `${f(newTotalHappiness)} \`${changes.happiness < 0 ? '' : '+'}${f(changes.happiness)}\`` },
                    { name: '🧍 Population:', value: `${f(newStats.population)} \`${changes.population < 0 ? '' : '+'}${f(changes.population)}\`` },
                    { name: '💵 Balance:', value: `$${f(newStats.balance)} \`${changes.balance < 0 ? '' : '+'}${f(changes.balance)}\`` },
                    { name: '🪨 Resources:', value: `${f(newStats.resources)} \`${changes.resources < 0 ? '' : '+'}${f(changes.resources)}\`` },
                    { name: '👨‍👩‍👧‍👦 Crowdedness:', value: `${f(newStats.crowdedness)} \`${changes.crowdedness < 0 ? '' : '+'}${f(changes.crowdedness)}\`` },
                    { name: '🚗 Traffic:', value: `${f(newStats.traffic)} \`${changes.traffic < 0 ? '' : '+'}${f(changes.traffic)}\`` },
                    { name: '🛢️ Pollution:', value: `${f(newStats.pollution)} \`${changes.pollution < 0 ? '' : '+'}${f(changes.pollution)}\`` },
                );

            await city.update({
                happiness: newTotalHappiness,
                population: newStats.population,
                balance: newStats.balance,
                resources: newStats.resources,
                crowdedness: newStats.crowdedness,
                traffic: newStats.traffic,
                pollution: newStats.pollution,
            });

            await interaction.reply({ content: 'You collected your taxes!', embeds: [newCityEmbed] });

            cooldown.set(interaction.user.id, true);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, 600000);
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
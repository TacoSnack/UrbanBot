const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const commaNumber = require('comma-number');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buildings')
        .setDescription('View your city\'s buildings'),
    async execute(interaction) {
        const f = (number) => commaNumber(number);
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const cityBuildings = await Cities.findOne({
                attributes: ['userId', 'name', 'plazasBuilt', 'busStationsBuilt'],
                where: { userId: interaction.user.id },
            });

            const costs = {
                plazaCost: (cityBuildings.plazasBuilt + 1) * 300,
                plazaResources: (cityBuildings.plazasBuilt + 1) * 200,
                busStationCost: (cityBuildings.busStationsBuilt + 1) * 200,
                busStationResources: (cityBuildings.busStationsBuilt + 1) * 180,
            }

            const maxes = {
                plazaMax: cityBuildings.plazasBuilt === 5,
                busStationMax: cityBuildings.busStationsBuilt === 5,
            }

            const cityBuildingsEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(`${cityBuildings.name} | Buildings`)
                .setDescription('Each building affects different stats. Use `/build [id]` to upgrade them.')
                .addFields(
                    { name: `⛲ Public plazas (\`plaza\`): ${cityBuildings.plazasBuilt}/5 built${maxes.plazaMax ? ' ✅' : ''}`, value: maxes.plazaMax ? 'This building is maxed!' : `Costs $${f(costs.plazaCost)} and ${f(costs.plazaResources)} resources.` },
                    { name: `🚏 Bus stations (\`station\`): ${cityBuildings.busStationsBuilt}/5 built${maxes.busStationMax ? ' ✅' : ''}`, value: maxes.busStationMax ? 'This building is maxed!' : `Costs $${f(costs.busStationCost)} and ${f(costs.busStationResources)} resources.` },
                );

            return interaction.reply({ embeds: [cityBuildingsEmbed] });
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
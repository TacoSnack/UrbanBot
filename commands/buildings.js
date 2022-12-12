const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buildings')
        .setDescription('View your city\'s buildings'),
    async execute(interaction) {
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const cityBuildings = await Cities.findOne({
                attributes: ['name', 'plazasBuilt', 'busStationsBuilt'],
                where: { userId: interaction.user.id },
            });

            const costs = {
                plazaCost: (cityBuildings.plazasBuilt + 1) * 2000,
                plazaResources: (cityBuildings.plazasBuilt + 1) * 500,
                busStationCost: (cityBuildings.busStationsBuilt + 1) * 3000,
                busStationResources: (cityBuildings.busStationsBuilt + 1) * 500,
            }

            const cityBuildingsEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(`${cityBuildings.name} | Buildings`)
                .setDescription('Each building affects different stats. Use `/build [id]` to upgrade them.')
                .addFields(
                    { name: `⛲ Public plazas (\`plaza\`): ${cityBuildings.plazasBuilt}/5 built`, value: `Costs $${costs.plazaCost} and ${costs.plazaResources} resources.` },
                    { name: `🚏 Bus stations (\`station\`): ${cityBuildings.busStationsBuilt}/5 built`, value: `Costs $${costs.busStationCost} and ${costs.busStationResources} resources.` },
                );

            return interaction.reply({ embeds: [cityBuildingsEmbed] });
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zones')
        .setDescription('View your city\'s zones'),
    async execute(interaction) {
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const cityZones = await Cities.findOne({
                attributes: ['userId', 'name', 'residentialLevel', 'commercialLevel', 'industrialLevel'],
                where: { userId: interaction.user.id },
            });

            const costs = {
                resCost: (cityZones.residentialLevel + 1) * 800,
                resResources: (cityZones.residentialLevel + 1) * 800,
                comCost: (cityZones.commercialLevel + 1) * 1000,
                comResources: (cityZones.commercialLevel + 1) * 800,
                indCost: (cityZones.industrialLevel + 1) * 1000,
                indResources: (cityZones.industrialLevel + 1) * 1500,
            }

            const maxes = {
                resMax: cityZones.residentialLevel === 15,
                comMax: cityZones.commercialLevel === 15,
                indMax: cityZones.industrialLevel === 15,
            }

            const cityZonesEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(`${cityZones.name} | Zones`)
                .setDescription('Each zone affects different stats. Use `/upgrade zone [id]` to upgrade them.')
                .addFields(
                    { name: `🏠 Residential zones (\`res\`): Level ${cityZones.residentialLevel}/15${maxes.resMax ? ' ✅' : ''}`, value: maxes.resMax ? 'This zone is maxed!' : `Costs $${costs.resCost} and ${costs.resResources} resources.` },
                    { name: `🏢 Commercial zones (\`com\`): Level ${cityZones.commercialLevel}/15${maxes.comMax ? ' ✅' : ''}`, value: maxes.comMax ? 'This zone is maxed!' : `Costs $${costs.comCost} and ${costs.comResources} resources.` },
                    { name: `🏭 Industrial zones (\`ind\`): Level ${cityZones.industrialLevel}/15${maxes.indMax ? ' ✅' : ''}`, value: maxes.indMax ? 'This zone is maxed!' : `Costs $${costs.indCost} and ${costs.indResources} resources` },
                );

            return interaction.reply({ embeds: [cityZonesEmbed] });
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
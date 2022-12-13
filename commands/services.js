const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('services')
        .setDescription('View your city\'s services'),
    async execute(interaction) {
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const cityServices = await Cities.findOne({
                attributes: ['userId', 'name', 'roadLevel', 'busLevel', 'parkLevel'],
                where: { userId: interaction.user.id },
            });

            const costs = {
                roadCost: (cityServices.roadLevel + 1) * 1000,
                roadResources: (cityServices.roadLevel + 1) * 500,
                busCost: (cityServices.busLevel + 1) * 2000,
                busResources: (cityServices.busLevel + 1) * 1000,
                parkCost: (cityServices.parkLevel + 1) * 1000,
                parkResources: (cityServices.parkLevel + 1) * 800,
            }

            const maxes = {
                roadMax: cityServices.roadLevel === 10,
                busMax: cityServices.busLevel === 10,
                parkMax: cityServices.parkLevel === 10,
            }

            const cityServicesEmbed = new EmbedBuilder()
                .setColor(0x73a0d0)
                .setTitle(`${cityServices.name} | Services`)
                .setDescription('Each service affects different stats. Use `/upgrade service [id]` to upgrade them.')
                .addFields(
                    { name: `🛣️ Road network (\`roads\`): Level ${cityServices.roadLevel}/10${maxes.roadMax ? ' ✅' : ''}`, value: maxes.roadMax ? 'This service is maxed!' : `Costs $${costs.roadCost} and ${costs.roadResources} resources.` },
                    { name: `🚌 Bus network (\`buses\`): Level ${cityServices.busLevel}/10${maxes.busMax ? ' ✅' : ''}`, value: maxes.busMax ? 'This service is maxed!' : `Costs $${costs.busCost} and ${costs.busResources} resources.` },
                    { name: `🏞️ Parks (\`parks\`): Level ${cityServices.parkLevel}/10${maxes.parkMax ? ' ✅' : ''}`, value: maxes.parkMax ? 'This service is maxed!' : `Costs $${costs.parkCost} and ${costs.parkResources} resources.` },
                );

            return interaction.reply({ embeds: [cityServicesEmbed] });
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
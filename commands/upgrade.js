const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upgrade')
        .setDescription('Upgrade a zone or service')
        .addSubcommand(subcommand =>
            subcommand
                .setName('zone')
                .setDescription('Upgrade a zone')
                .addStringOption(option =>
                    option
                        .setName('zone')
                        .setDescription('The id of the zone')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('service')
                .setDescription('Upgrade a service')
                .addStringOption(option =>
                    option
                        .setName('service')
                        .setDescription('The id of the service')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const city = await Cities.findOne({
                attributes: ['userId', 'balance', 'resources', 'residentialLevel', 'commercialLevel', 'industrialLevel', 'roadLevel', 'busLevel', 'parkLevel'],
                where: { userId: interaction.user.id },
            });

            const costs = {
                resCost: (city.residentialLevel + 1) * 2000,
                resResources: (city.residentialLevel + 1) * 1500,
                comCost: (city.commercialLevel + 1) * 1000,
                comResources: (city.commercialLevel + 1) * 800,
                indCost: (city.industrialLevel + 1) * 900,
                indResources: (city.industrialLevel + 1) * 800,
                roadCost: (city.roadLevel + 1) * 750,
                roadResources: (city.roadLevel + 1) * 450,
                busCost: (city.busLevel + 1) * 1200,
                busResources: (city.busLevel + 1) * 1200,
                parkCost: (city.parkLevel + 1) * 1500,
                parkResources: (city.parkLevel + 1) * 1200,
            }

            const maxes = {
                resMax: city.residentialLevel === 15,
                comMax: city.commercialLevel === 15,
                indMax: city.industrialLevel === 15,
                roadMax: city.roadLevel === 10,
                busMax: city.busLevel === 10,
                parkMax: city.parkLevel === 10,
            }

            const upgrade = async (id, cost, resources) => {
                await city.increment(id, { by: 1 });
                await city.decrement({
                    'balance': cost,
                    'resources': resources,
                });
            }

            if (interaction.options.getSubcommand() === 'zone') {
                const zoneId = interaction.options.getString('zone');

                switch (zoneId) {
                    case 'res':
                        if (maxes.resMax) return interaction.reply('This zone is maxed!');
                        if (city.balance < costs.resCost || city.resources < costs.resResources) return interaction.reply('You can\'t afford this upgrade!');

                        await upgrade('residentialLevel', costs.resCost, costs.resResources);

                        await interaction.reply('You upgraded your **residential zones**!');
                        break;
                    case 'com':
                        if (maxes.comMax) return interaction.reply('This zone is maxed!');
                        if (city.balance < costs.comCost || city.resources < costs.comResources) return interaction.reply('You can\'t afford this upgrade!');

                        await upgrade('commercialLevel', costs.comCost, costs.comResources);

                        await interaction.reply('You upgraded your **commercial zones**!');
                        break;
                    case 'ind':
                        if (maxes.indMax) return interaction.reply('This zone is maxed!');
                        if (city.balance < costs.indCost || city.resources < costs.indResources) return interaction.reply('You can\'t afford this upgrade!');

                        await upgrade('industrialLevel', costs.indCost, costs.indResources);

                        await interaction.reply('You upgraded your **industrial zones**!');
                        break;
                    default:
                        return interaction.reply('Please enter a valid zone id!');
                }
            } else if (interaction.options.getSubcommand() === 'service') {
                const serviceId = interaction.options.getString('service');

                switch (serviceId) {
                    case 'roads':
                        if (maxes.roadMax) return interaction.reply('This service is maxed!');
                        if (city.balance < costs.roadCost || city.resources < costs.roadResources) return interaction.reply('You can\'t afford this upgrade!');

                        await upgrade('roadLevel', costs.roadCost, costs.roadResources);

                        await interaction.reply('You upgraded your **road network**!');
                        break;
                    case 'buses':
                        if (maxes.busMax) return interaction.reply('This service is maxed!');
                        if (city.balance < costs.busCost || city.resources < costs.busResources) return interaction.reply('You can\'t afford this upgrade!');

                        await upgrade('busLevel', costs.busCost, costs.busResources);
                            
                        await interaction.reply('You upgraded your **bus network**!');
                        break;
                    case 'parks':
                        if (maxes.parkMax) return interaction.reply('This service is maxed!');
                        if (city.balance < costs.parkCost || city.resources < costs.parkResources) return interaction.reply('You can\'t afford this upgrade!');

                        await upgrade('parkLevel', costs.parkCost, costs.parkResources);

                        await interaction.reply('You upgraded your **parks**!');
                        break;
                    default:
                        return interaction.reply('Please enter a valid service id');
                }
            }
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
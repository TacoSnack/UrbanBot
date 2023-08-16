const { Cities } = require('../models/cities.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('build')
        .setDescription('Build a building')
        .addStringOption(option =>
            option
                .setName('building')
                .setDescription('The id of the building')
                .setRequired(true)
        ),
    async execute(interaction) {
        const buildingId = interaction.options.getString('building')
        const cityExists = await Cities.findByPk(interaction.user.id);

        if (cityExists) {
            const city = await Cities.findOne({
                attributes: ['userId', 'balance', 'resources', 'plazasBuilt', 'busStationsBuilt', 'hospitalsBuilt'],
                where: { userId: interaction.user.id },
            });

            const costs = {
                plazaCost: (city.plazasBuilt + 1) * 900,
                plazaResources: (city.plazasBuilt + 1) * 600,
                busStationCost: (city.busStationsBuilt + 1) * 600,
                busStationResources: (city.busStationsBuilt + 1) * 540,
                hospitalCost: (city.hospitalsBuilt + 1) * 1500,
                hospitalResources: (city.hospitalsBuilt + 1) * 1500,
            }

            const maxes = {
                plazaMax: city.plazasBuilt === 5,
                busStationMax: city.busStationsBuilt === 5,
                hospitalMax: city.hospitalsBuilt === 5,
            }

            const build = async (id, cost, resources) => {
                await city.increment(id, { by: 1 });
                await city.decrement({
                    'balance': cost,
                    'resources': resources,
                });
            }

            switch (buildingId) {
                case 'plaza':
                    if (maxes.plazaMax) return interaction.reply('This building is maxed!');
                    if (city.balance < costs.plazaCost || city.resources < costs.plazaResources) return interaction.reply('You can\'t afford this building!');

                    await build('plazasBuilt', costs.plazaCost, costs.plazaResources);

                    await interaction.reply('You built a **public plaza!**');
                    break;
                case 'station':
                    if (maxes.busStationMax) return interaction.reply('This building is maxed!');
                    if (city.balance < costs.busStationCost || city.resources < costs.busStationResources) return interaction.reply('You can\'t afford this building!');

                    await build('busStationsBuilt', costs.busStationCost, costs.busStationResources);

                    await interaction.reply('You built a **bus station!**');
                    break;
                case 'hospital':
                    if (maxes.hospitalMax) return interaction.reply('This building is maxed!');
                    if (city.balance < costs.hospitalCost || city.resources < costs.hospitalResources) return interaction.reply('You cant\'t afford this building!');

                    await build('hospitalsBuilt', costs.hospitalCost, costs.hospitalResources);

                    await interaction.reply('You built a **hospital!**');
                    break;
                default:
                    return interaction.reply('Please enter a valid building id!');
            }
        } else {
            return interaction.reply('You haven\'t created a city! Use `/found` to create one!');
        }
    }
}
const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

const Cities = db.define('cities', {
    user_id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    happiness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 500,
    },
    resources: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 500,
    },
    crowdedness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    traffic: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    pollution: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    residentialLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    commercialLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    industrialLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    roadLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    busLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    parkLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    plazasBuilt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    busStationsBuilt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = { Cities };
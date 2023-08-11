const { DataTypes } = require('sequelize');
const { db } = require('../database.js');

const Cities = db.define('cities', {
    userId: {
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
    safety: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50,
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
        validate: { max: 15 },
    },
    commercialLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { max: 15 },
    },
    industrialLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { max: 15 },
    },
    roadLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { max: 10 },
    },
    busLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { max: 10 },
    },
    parkLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { max: 10 },
    },
    policeLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { max: 10 },
    },
    fireLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { max: 10 },
    },
    plazasBuilt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { max: 5 },
    },
    busStationsBuilt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { max: 5 },
    },
    hospitalsBuilt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { max: 5 },
    },
});

module.exports = { Cities };
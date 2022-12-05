const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

const Tags = db.define('tags', {
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: DataTypes.TEXT,
});

module.exports = { Tags }
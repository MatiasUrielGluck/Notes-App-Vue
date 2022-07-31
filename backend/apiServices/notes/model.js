const { DataTypes } = require('sequelize')
const sequelize = require('../../services/database')
const Category = require('../categories/model')

const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },
    archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = Note
const { DataTypes } = require('sequelize')
const sequelize = require('../../services/database')

const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categories: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Note
const { DataTypes } = require('sequelize')
const sequelize = require('../../services/database')
const Note = require('../notes/model')

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false })

module.exports = Category
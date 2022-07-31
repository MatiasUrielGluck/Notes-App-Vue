const sequelize = require('../../services/database')
const Note = require('../notes/model')
const categoryModel = require('./model')
const associateModels = require('../associations')

associateModels()

module.exports = {
    async getCategories() {
        return categoryModel.findAll({
            include: Note,
            raw:true
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async getCategory(id) {
        return categoryModel.findAll({
            where: {
                id: id
            },
            include: Note,
            raw:true
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async createCategory(name) {
        return categoryModel.create({
            name: name
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async updateCategory(id, name) {
        return categoryModel.upsert({
            id: id,
            name: name
        })
    },

    async deleteCategory(id) {
        return categoryModel.destroy({
            where: {
                id: id
            }
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}
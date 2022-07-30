const sequelize = require('../../services/database')
const noteModel = require('./model')

module.exports = {
    async getNotes() {
        return noteModel.findAll({
            raw:true
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async getNote(id) {
        return noteModel.findAll({
            where: {
                id: id
            },

            raw:true
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async createNote(title, content, categories="[]") {
        return noteModel.create({
            title: title,
            content: content,
            categories: categories
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async updateNote(id, title, content, categories) {
        return noteModel.upsert({
            id: id,
            title: title,
            content: content,
            categories: categories
        })
    },

    async deleteNote(id) {
        return noteModel.destroy({
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
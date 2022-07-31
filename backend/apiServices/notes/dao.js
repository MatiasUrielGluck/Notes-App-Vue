const sequelize = require('../../services/database')
const Category = require('../categories/model')
const noteModel = require('./model')
const categoryModel = require('../categories/model')
const categoryDao = require('../categories/dao')
const associateModels = require('../associations')

associateModels()

module.exports = {
    async getNotes() {
        return noteModel.findAll({
            include: Category,
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
            include: Category,
            raw:true
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async createNote(title, content, archived="false") {
        return noteModel.create({
            title: title,
            content: content,
            archived: archived
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async addCategory(id, categoryId) {
        const note = await noteModel.findOne({
            where: {
                id: id
            }
        })
        const category = await categoryModel.findOne({
            where: {
                id: categoryId
            }
        })
        const result = await note.addCategory(category)
        return result
    },

    async removeCategory(id, categoryId) {
        const note = await noteModel.findOne({
            where: {
                id: id
            }
        })
        const category = await categoryModel.findOne({
            where: {
                id: categoryId
            }
        })
        const result = await note.removeCategory(category)
        return result
    },
    
    async updateNote(id, title, content, archived="false") {
        return noteModel.upsert({
            id: id,
            title: title,
            content: content,
            archived: archived
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
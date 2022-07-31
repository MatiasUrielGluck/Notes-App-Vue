const categoryDao = require('./dao')

module.exports = {
    async getCategories(req, res) {
        const categories = await categoryDao.getCategories()
        res.send(JSON.stringify(categories))
    },

    async getCategory(req, res) {
        const { id } = req.params
        const category = await categoryDao.getCategory(id)
        res.send(JSON.stringify(category))
    },
    
    async createCategory(req, res) {
        const { name } = req.body
        const category = await categoryDao.createCategory(name)
        res.send(JSON.stringify(category))
    },
    
    async updateCategory(req, res) {
        const { id } = req.params
        const { name } = req.body
        const category = await categoryDao.updateCategory(id, name)
        res.send(JSON.stringify(category))
    },

    async deleteCategory(req, res) {
        const { id } = req.params
        const category = await categoryDao.deleteCategory(id)
        res.send(JSON.stringify(category))
    }
}
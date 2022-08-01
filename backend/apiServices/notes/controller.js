const noteDao = require('./dao')

module.exports = {
    async getNotes(req, res) {
        const notes = await noteDao.getNotes()
        res.send(JSON.stringify(notes))
    },

    async getNote(req, res) {
        const { id } = req.params
        const note = await noteDao.getNote(id)
        res.send(JSON.stringify(note))
    },
    
    async createNote(req, res) {
        const { title, content, archived } = req.body
        const note = await noteDao.createNote(title, content, archived)
        res.send(JSON.stringify(note))
    },

    async addCategory(req, res) {
        const { id } = req.params
        const { categoryId } = req.body
        const result = await noteDao.addCategory(id, categoryId)
        res.send(result)
    },
    
    async updateNote(req, res) {
        const { id } = req.params
        const { title, content, archived } = req.body
        const note = await noteDao.updateNote(id, title, content, archived)
        res.send(JSON.stringify(note))
    },

    async deleteNote(req, res) {
        const { id } = req.params
        const { removecategory } = req.query

        if (removecategory != undefined) {
            await noteDao.removeCategory(id, removecategory)
            res.send(200)
            return
        }
        const note = await noteDao.deleteNote(id)
        res.send(JSON.stringify(note))
    }
}
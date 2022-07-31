const Note = require('./notes/model')
const Category = require('./categories/model')

function associateModels() {
    Note.belongsToMany(Category, { through: "Note_Category" })
    Category.belongsToMany(Note, { through: "Note_Category" })
}

module.exports = associateModels
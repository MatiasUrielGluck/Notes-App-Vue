const sequelize = require('./services/database')
const Note = require('./apiServices/notes/model')
const Category = require('./apiServices/categories/model')
const associateModels = require('./apiServices/associations')

// const categories = [
//     { name: "Programacion" },
//     { name: "Clase" },
//     { name: "Matematica" },
//     { name: "Favorito" },
// ]

// const notes = [
//     { title: "Clase 1", content: "contenido 1", archived: false },
//     { title: "Clase 2", content: "contenido 2", archived: false },
//     { title: "Clase 3", content: "contenido 3", archived: false },
// ]

// Note.belongsToMany(Category, { through: "Note_Category" })
// Category.belongsToMany(Note, { through: "Note_Category" })

associateModels()

sequelize.sync({ force: true })
.then(() => {
    console.log('Conected')
})
// .then(() => {
//     // Seed notes
//     notes.forEach(note => Note.create(note))
// })
// .then(() => {
//     // Seed categories
//     categories.forEach(category => Category.create(category))
// })
// .then(async () => {
//     // let note1 = await Note.create({
//     //     title: 'Clase 1',
//     //     content: 'Tengo mi contentenido',
//     //     archived: false
//     // }, {
//     //     include: 'categories'
//     // })

//     // const clase1Not = await Note.create({
//     //     title: 'Clase 1',
//     //     content: 'Tengo mi contentenido',
//     //     archived: false
//     // })

//     // const claseCat = await Category.create({
//     //     name: 'Clase'
//     // })

//     // await clase1Not.addCategory
// })
.then(async () => {
    const nota1 = await Note.create({
        title: 'Clase 1',
        content: 'Tengo mi contentenido',
        archived: false
    })

    const categoria1 = await Category.create({
        name: 'Programacion'
    })

    const categoria2 = await Category.create({
        name: 'UADE'
    })

    await nota1.addCategory(categoria1)
    await nota1.addCategory(categoria2)

    // await nota1.removeCategory(categoria1)
    Category.destroy({
        where: {
            name: 'UADE'
        }
    })

    const result = await Note.findOne({
        where: {
            id: 1
        }, 
        include: Category
    })

    const result2 = await Category.findAll({
        include: Note,
        raw:true
    })

    console.log(result.toJSON())
    console.log(result2)
})
.catch(err => {
    console.log(err)
})
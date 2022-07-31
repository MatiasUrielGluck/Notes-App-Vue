const express = require('express')
const app = express()
const { port } = require('./config')
const noteRoutes = require('./apiServices/notes/routes')
const categoriesRoutes = require('./apiServices/categories/routes')
const sequelize = require('./services/database')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/notes', noteRoutes)
app.use('/categories', categoriesRoutes)

app.listen(port, async () => {
    console.log(`Listening on port ${port}...`)

    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})
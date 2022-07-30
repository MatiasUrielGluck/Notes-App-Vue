const express = require('express')
const app = express()
const { port } = require('./config')
const routes = require('./apiServices/notes/routes')
const sequelize = require('./services/database')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/notes', routes)

app.listen(port, async () => {
    console.log(`Listening on port ${port}...`)

    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})
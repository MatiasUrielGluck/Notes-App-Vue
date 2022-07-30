module.exports = {
    port: process.env.PORT || 3000,

    database: {
        username: "root",
        password: "rootpassword",
        database: "ensolverschallenge",
        host: "localhost",
        dialect: "mysql"
    }
}
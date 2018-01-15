const configDB = require('../../config/database');
const Sequelize = require('sequelize');

const db = new Sequelize(configDB.name,
    configDB.user,
    configDB.password, {
        host: 'localhost',
        dialect: 'mysql'
    });

db.sync({force: false})
    .then(() => {
        console.log("Database Synchronised");
    })
    .catch((err) => {
        console.log("Error setting up Database");
        console.error(err);
    });

module.exports = {
    db
};
/**
 * Created by jainaman224 on 11/9/17.
 */

const bcrypt = require('bcrypt-nodejs');
const configDB = require('../../config/database');
const Sequelize = require('sequelize');

const db = new Sequelize(configDB.name,
    configDB.user,
    configDB.password, {
    host: 'localhost',
    dialect: 'mysql'
});

const User = db.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: Sequelize.STRING,
        unique:true
    },
    email: {
        type: Sequelize.STRING,
        unique:true
    },
    username: {
        type: Sequelize.STRING,
        unique:true
    },
    password: Sequelize.STRING
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
    db,
    models: {
        User
    }
};
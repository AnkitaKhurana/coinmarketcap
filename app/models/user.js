/**
 * Created by jainaman224 on 11/9/17.
 */
const db = require('./index').db;
const Sequelize = require('sequelize');

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
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

module.exports = {
    User
};
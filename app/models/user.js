/**
 * Created by jainaman224 on 11/9/17.
 */
const db = require('./index').db;
const Sequelize = require('sequelize');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

const AuthToken = db.define('authtoken', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: Sequelize.STRING,
        unique: true,
        index: true
    }
});

User.hasOne(AuthToken);

module.exports = {
    User,
    AuthToken
};
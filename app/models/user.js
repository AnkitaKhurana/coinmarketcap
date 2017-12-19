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
        primaryKey: true
    },
    token: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }

});

const Bitcoin = db.define('bitcoin', {

    timestamp: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    price: {
       type: Sequelize.FLOAT
    }

});

const Ethereum = db.define('ethereum', {

    timestamp: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    price: {
        type: Sequelize.FLOAT
    }

});

const BitcoinCash = db.define('bitcoincash', {

    timestamp: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    price: {
        type: Sequelize.FLOAT
    }

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
        User,
        Bitcoin,
        BitcoinCash,
        Ethereum
    }
};
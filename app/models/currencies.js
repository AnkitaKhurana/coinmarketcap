/**
 * Created by jainaman224 on 11/9/17.
 */

const configDB = require('../../config/database');
const Sequelize = require('sequelize');
const db = require('./user').db
const cryptocurrency = configDB.cryptocurrency;

const schema = {
    timestamp: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    price: {
       type: Sequelize.FLOAT
    }
};

var currency = {};

for (each in cryptocurrency) {
    currency[each] = db.define(each, schema);
}

module.exports = {
    db,
    currency
};
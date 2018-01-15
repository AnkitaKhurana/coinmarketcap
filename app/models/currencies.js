/**
 * Created by jainaman224 on 11/9/17.
 */

const Sequelize = require('sequelize');
const db = require('./index').db;
const cryptocurrency = require('../../config/database').cryptocurrency;

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

for (var each in cryptocurrency) {
    currency[each] = db.define(each, schema);
}

module.exports = {
    currency
};
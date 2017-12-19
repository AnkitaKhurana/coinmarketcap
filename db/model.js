/**
 * Created by ankita on 16/6/17.
 */

const Sequelize = require('sequelize');

const db = new Sequelize({
    username: 'root',
    password: '1234',
    database: 'coinmarketcap',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }

});

const Coin = db.define('coin', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },

    name: Sequelize.STRING,
    symbol: Sequelize.STRING,
    rank:Sequelize.INTEGER ,
    price_usd: Sequelize.FLOAT,
    price_btc: Sequelize.FLOAT,
    tf_h_volume_usd: Sequelize.FLOAT,
    market_cap_usd: Sequelize.FLOAT,
    available_supply: Sequelize.FLOAT,
    total_supply: Sequelize.FLOAT,
    percent_change_1h: Sequelize.FLOAT,
    percent_change_24h: Sequelize.FLOAT,
    percent_change_7d: Sequelize.REAL,
    last_updated: Sequelize.INTEGER
});




db.sync({force: false}).then(() => {
    console.log('Database is synchronised');
});

module.exports = {
   Coin
};
/**
 * Created by ankita on 19/12/17.
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
    rank:Sequelize.STRING ,
    price_usd: Sequelize.STRING,
    price_btc: Sequelize.STRING,
    tf_h_volume_usd: Sequelize.STRING,
    market_cap_usd: Sequelize.STRING,
    available_supply: Sequelize.STRING,
    total_supply: Sequelize.STRING,
    percent_change_1h: Sequelize.STRING,
    percent_change_24h: Sequelize.STRING,
    percent_change_7d: Sequelize.STRING,
    last_updated: Sequelize.STRING
});




db.sync({force: false}).then(() => {
    console.log('Database is synchronised');
});

module.exports = {
   Coin
};
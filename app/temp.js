/**
 * Created by jainaman224 on 10/9/17.
 */

const router = require('express').Router;
const bitcoincash = require('./models/user').db.models.BTC;     //put Bit coin cash here
const bitcoin = require('./models/user').db.models.BTC;
const ethereum = require('./models/user').db.models.ETH;
// const bitcoinCash = require('./models/user').models.BitcoinCash;
const route = router();

route.get('/bitcoin/day', (req, res) => {
    var current_unix_time = Math.round((new Date()).getTime() / 1000);

    bitcoin.findAll({
        attributes: ['timestamp', 'price'],
        where: {
            timestamp: {
                $and: {
                    $lte: current_unix_time,
                    $gte: current_unix_time-24*60*60
                }
            }
        }
    }).then((coins) => {
        res.status(200).json(coins);
    });
});

route.get('/ethereum/day', (req, res) => {
    var current_unix_time = Math.round((new Date()).getTime() / 1000);

    ethereum.findAll({
        attributes: ['timestamp', 'price'],
        where: {
            timestamp: {
                $and: {
                    $lte: current_unix_time,
                    $gte: current_unix_time-24*60*60
                }
            }
        }
    }).then((coins) => {
        res.status(200).json(coins);
    });
});

route.get('/bitcoin-cash/day', (req, res) => {
    var current_unix_time = Math.round((new Date()).getTime() / 1000);

    bitcoinCash.findAll({
        attributes: ['timestamp', 'price'],
        where: {
            timestamp: {
                $and: {
                    $lte: current_unix_time,
                    $gte: current_unix_time-24*60*60
                }
            }
        }
    }).then((coins) => {
        res.status(200).json(coins);
    });
});

route.get('/leaderboard', (req, res) => {

    //CHANGE API


    var current_unix_time = Math.round((new Date()).getTime() / 1000);

    bitcoincash.findAll({
        attributes: ['timestamp', 'price'],
        where: {
            timestamp: {
                $and: {
                    $lte: current_unix_time,
                    $gte: current_unix_time-24*60*60
                }
            }
        }
    }).then((coins) => {
        res.status(200).json(coins);
    });
});



module.exports = route;
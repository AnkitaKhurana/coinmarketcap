/**
 * Created by jainaman224 on 10/9/17.
 */

const async = require('async');
const cron = require('node-cron');
const express = require('express');
const request = require('request');
const currency = require('./app/models/currencies').currency;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const cryptocurrency = require('./config/database').cryptocurrency;

cron.schedule('* * * * *', function() {
    request('https://api.cryptonator.com/api/ticker/btc-usd', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            usd = parseFloat(body.ticker.price);
            currency['BTC'].findOrCreate({ where: {
                timestamp: new Date().getTime()/1000
            },
            defaults : {
                price: usd
            }}).then((coin, created) => {
                request('https://api.binance.com/api/v1/ticker/allPrices', function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        body = JSON.parse(body);
                        for (each1 in body){
                            for (each in cryptocurrency) {
                                if (body[each1]['symbol'] == each + 'BTC') {
                                    currency[each].findOrCreate({ where: {
                                        timestamp: new Date().getTime()/1000
                                    },
                                    defaults : {
                                        price: parseFloat(body[each1]['price']) * usd
                                    }}).then((coin, created) => {

                                    }).catch((err) => {
                                        console.log(err);
                                    });
                                }
                            }
                        }

                    }
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    });
}).start();


app.use('/api', require('./app/api.js'));

app.listen(3000, function() {
        console.log("Listening on port http://localhost:3000");
    }
);
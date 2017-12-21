/**
 * Created by jainaman224 on 10/9/17.
 */

const async = require('async');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const request = require('request');
const currency = require('./app/models/currencies').currency;
const app = express();

const configDB = require('./config/database');
const cryptocurrency = configDB.cryptocurrency;

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

require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.use(express.static("static/"));

app.use(cookieParser('abracadabra'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: 'abracadabra',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport);

app.use('/api', require('./app/api.js'));

app.listen(3000, function() {
        console.log("Listening on port http://localhost:3000");
    }
);
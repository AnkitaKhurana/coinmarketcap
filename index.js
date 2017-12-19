const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const request = require('request');
const bitcoin = require('./app/models/user').models.Bitcoin;
const ethereum = require('./app/models/user').models.Ethereum;
const bitcoinCash = require('./app/models/user').models.BitcoinCash;
const app = express();

const task1 = cron.schedule('*/4 * * * *', function() {
    request({
        url: "https://api.coinmarketcap.com/v1/ticker/bitcoin",
        method: "GET",
        timeout: 10000
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            body = JSON.parse(body);
            bitcoin.findOrCreate({ where: {
                timestamp: parseInt(body[0].last_updated)
            },
                defaults : {
                    price: parseFloat(body[0].price_usd)
                }}).then((coin, created) => {
                console.log(coin);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('error');
        }
    });
}, false);

const task2 = cron.schedule('*/4 * * * *', function() {
    request({
        url: "https://api.coinmarketcap.com/v1/ticker/ethereum",
        method: "GET",
        timeout: 10000
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            body = JSON.parse(body);
            ethereum.findOrCreate({ where: {
                timestamp: parseInt(body[0].last_updated)
            },
                defaults : {
                    price: parseFloat(body[0].price_usd)
                }}).then((coin, created) => {
                console.log(coin);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('error');
        }
    });
}, false);

const task3 = cron.schedule('*/4 * * * *', function() {
    request({
        url: "https://api.coinmarketcap.com/v1/ticker/bitcoin-cash",
        method: "GET",
        timeout: 10000
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            body = JSON.parse(body);
            bitcoinCash.findOrCreate({ where: {
                timestamp: parseInt(body[0].last_updated)
            },
                defaults : {
                    price: parseFloat(body[0].price_usd)
                }}).then((coin, created) => {
                console.log(coin);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('error');
        }
    });
}, false);

task1.start();
task2.start();
task3.start();

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
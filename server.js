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

const parallelfunctions = {};

for (each in cryptocurrency) {
    parallelfunctions[each] = function(callback) {
        request("https://api.cryptonator.com/api/ticker/" + each + "-usd", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body);
            } else {
                callback(true, {});
            }
        });
    }
}

const task1 = cron.schedule('* * * * *', function() {
    async.parallel(parallelfunctions,
        function(err, result){
            for (each in result) {
                body = JSON.parse(JSON.stringify(result[each]));
                currency[each].findOrCreate({ where: {
                    timestamp: parseInt(body.timestamp)
                },
                defaults : {
                    price: parseFloat(body.ticker.price)
                }}).then((coin, created) => {
                    console.log('no error');
                }).catch((err) => {
                    console.log(err);
                })
            }
        });
}, false);

task1.start();

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
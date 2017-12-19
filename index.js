
const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const expressSession = require('express-session');
const cron = require('node-cron');
const axios = require("axios");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({
    secret: 'my super secret',
    resave: false,
    saveUninitialized: false
}));



app.use('/',require('./routes/index') );

app.use('/', express.static(__dirname + "/public_static"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.listen(process.env.PORT||3456, function () {

    const url ="http://localhost:3456";
    axios.get(url)
        .then(response => {
            console.log('running....');
        })
        .catch(error => {
            console.log(error);
        });

    cron.schedule('*/5 * * * *', function(){
        const url ="http://localhost:3456";
        axios.get(url)
            .then(response => {
                console.log('running....');
            })
            .catch(error => {
                console.log(error);
            });


        console.log('Saving in DB every 5 minutes');
    });

    console.log("Server started on http://localhost:", this.address().port);



});


if(process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', function(err) {
        console.error('FATAL: Uncaught exception.');
        console.error(err.stack||err);
        setTimeout(function(){
            process.exit(1);
        }, 100);
    });
}




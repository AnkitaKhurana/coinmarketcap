const route = require('express').Router();
const request = require('request');




route.get('/',(req,res)=>{
    // res.send(req.user);
    var url = 'https://api.coinmarketcap.com/v1/ticker/';
    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        var newinfo = body;
        storetodb(newinfo);


    });



    res.render('mainpage', { title: 'Coinmarketcap'});

});


module.exports = route;
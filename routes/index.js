const route = require('express').Router();
const request = require('request');
const Coin = require('../db/model').Coin;




route.get('/',(req,res)=>{
    // res.send(req.user);
    var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=1';
    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.


        var newinfo = JSON.parse(body);
        console.log(newinfo);


            Coin.bulkCreate(

            newinfo,{
                    updateOnDuplicate:true
                }


            ).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
            return Coin.findAll();
        }).then(coins => {
            // console.log(coins) // ... in order to get the array of user objects
        })




    });



    res.render('mainpage', { title: 'Coinmarketcap'});

});




module.exports = route;
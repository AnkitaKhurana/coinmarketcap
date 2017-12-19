const route = require('express').Router();
const request = require('request');
const Coin = require('../db/model').Coin;




route.get('/',(req,res)=>{
    // res.send(req.user);
    var url = 'https://api.coinmarketcap.com/v1/ticker/';
    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.


        var newinfo = JSON.parse(body);

        var str="";
        for (i of newinfo)
        str += "{"+"'id':'"+i.id+"',"
            +"'name':'"+i.name+"',"
            +"'symbol':'"+i.symbol+"',"
            +"'rank':'"+ i.rank+"',"
            +"'price_usd':'"+i.price_usd+"',"
            +"'price_btc':'"+i.price_btc+"',"
            // tf_h_volume_usd: i.["24h_volume_usd"],
            +"'market_cap_usd':'" +i.market_cap_usd+"',"
            +"'available_supply':' "+i.available_supply+"',"
            +"'total_supply':'"+ i.total_supply+"',"
            +"'percent_change_1h':'"+ i.percent_change_1h+"',"
            +"'percent_change_24h':'"+ i.percent_change_24h+"',"
            +"'percent_change_7d':'"+ i.percent_change_7d+"',"
            +"'last_updated':'"+ i.last_updated+"'"+"},"
        console.log(newinfo);





            Coin.bulkCreate(


            newinfo



            ).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
            return Coin.findAll();
        }).then(coins => {
            // console.log(coins) // ... in order to get the array of user objects
        })




    });



    res.render('mainpage', { title: 'Coinmarketcap'});

});




module.exports = route;
const route = require('express').Router();
const request = require('request');
const Coin = require('../db/model').Coin;

route.get('/',(req,res)=>{
    res.render('mainpage', { title: 'Coinmarketcap'});
});

module.exports = route;
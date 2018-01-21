/**
 * Created by championswimmer on 15/06/17.
 */
const route = require('express').Router();
const User = require('../models/user').User;
const AuthToken = require('../models/user').AuthToken;
const uid2 = require('uid2');

route.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        AuthToken.create({
            token: uid2(20),
            userId: user.id
        }).then((authToken) => {
            return res.send({
                token: authToken.token
            });
        })
    })
});

module.exports = route;

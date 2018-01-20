/**
 * Created by championswimmer on 15/06/17.
 */
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user').User;
const AuthToken = require('../models/user').AuthToken;

passport.use(new BearerStrategy(function (token, done) {
    AuthToken.findOne({
        where: {
            token: token
        },
        include: [User]
    }).then((token) => {
        if(!token)
            return done(null, false, {message: 'No such token found'});
        done(null, token.user);
    }).catch((err) => {
        return done(err)
    });
}));

module.exports = passport;
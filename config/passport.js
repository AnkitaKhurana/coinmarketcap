/**
 * Created by jainaman224 on 11/9/17.
 */

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../app/models/user').models.User;

const configAuth = require('./auth');

module.exports = function(passport) {

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            passReqToCallback : true
        },

        function(req, token, refreshToken, profile, cb) {
            process.nextTick(function() {
                User.findOrCreate({where: {
                    id: profile.id,
                    token: token,
                    email: '',
                    name: profile.displayName
                }}).then((user) => {
                    return cb(null, user);
                });
            });
        }));

    passport.use(new GoogleStrategy({
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,
            passReqToCallback : true
        },

        function(req, token, refreshToken, profile, cb) {

            process.nextTick(function() {

                User.findOrCreate({where: {
                    id: profile.id,
                    token: token,
                    email: '',
                    name: profile.displayName
                }}).then((user, created) => {
                    return cb(null, user);
                });

            });

        }));

        passport.serializeUser(function(user, cb) {
            cb(null, user);
        });

        passport.deserializeUser(function(obj, cb) {
            cb(null, obj);
        });

};
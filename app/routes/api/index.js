/**
 * Created by championswimmer on 15/06/17.
 */
const route = require('express').Router();
const passport = require('../../auth/passport');

route.use(passport.authenticate('bearer',{ session: false }));
route.use('/test', require('./test'));

module.exports = route;
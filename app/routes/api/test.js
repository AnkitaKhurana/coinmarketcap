/**
 * Created by championswimmer on 15/06/17.
 */
const route = require('express').Router();

route.get('/', (req, res) => {
    res.status(200).send(req.user.username);
});

module.exports = route;
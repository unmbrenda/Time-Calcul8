const express = require('express');
const htmlRouter = express.Router();


renderLandingPage = (req, res, next) => {
    return res.render('index');
};

renderClockInOut = (req, res, next) => {
    return res.render('clockInOut');
};

htmlRouter.get('/punch', renderClockInOut);
htmlRouter.get('/', renderLandingPage);


module.exports = {
    htmlRouter,
}
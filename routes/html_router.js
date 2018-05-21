const express = require('express');
const htmlRouter = express.Router();


renderLandingPage = (req, res, next) => {
    return res.render('employee-home');
};

renderClockInOut = (req, res, next) => {
    return res.render('clockInOut');
};

htmlRouter.get('/', renderLandingPage);
htmlRouter.get('/punch', renderClockInOut);


module.exports = {
    htmlRouter,
}
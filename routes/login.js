let express = require('express')
let login = express.Router()
let bcrypt = require('bcrypt');
let passport = require('passport');
const saltRounds = 10;

let db = require('../models')
let middleware = require('../middleware')

login.get('/employee/login', (req,res)=>{
    res.render('login');
})
login.get('/employee/home', (req, res)=>{
    res.render('employee-home');
})

login.post('/employee/login', passport.authenticate('local'), (req, res)=>{
    res.redirect('/employee/home');
})

login.get('/employee/register', (req, res)=>{
    res.render('employee-register');
})
login.post('/employee/register', (req, res)=>{
    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
        db.User.create({
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: hash,
            PositionId: req.body.position
        })
    })
    
})
login.get('/logout', middleware.isLoggedIn, (req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = login;
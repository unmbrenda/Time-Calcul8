let express = require('express')
let login = express.Router()
let bcrypt = require('bcrypt');
let passport = require('passport');
const saltRounds = 10;

let db = require('../models')
let middleware = require('../middleware')

login.get('/employee/login', middleware.isLoggedIn,(req,res)=>{
    res.redirect('/employee/home');
})
login.get('/employee/home', middleware.isLoggedIn, (req, res)=>{
    res.render('employee-home');
})

login.post('/employee/login', passport.authenticate('employee'), (req, res)=>{
    req.flash('success', 'Successfully logged in as employee')
    res.redirect('/employee/home');

})

login.get('/employee/register', middleware.isManager, (req, res)=>{
    res.render('employee-register');
})
login.post('/employee/register', middleware.isManager,(req, res)=>{
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
        db.User.create({
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: hash,
            PositionId: req.body.position
        }).then(data=>{
            req.flash('success', `Successfully registered ${data.first_name} ${data.last_name}`);
            res.redirect('/manager/home');
        }).catch(err=>{
            req.flash('error', 'Failed to register.');
            res.redirect('/manager/home')
        })
    })
    
})
login.get('/manager/login',middleware.isManager ,(req,res)=>{
    res.redirect('/manager/home')
})
login.post('/manager/login', (req,res,next)=>{
    passport.authenticate('manager', (err, user, info)=>{
        if(err) {
            req.flash('error', 'Database unavailable');
            res.redirect('/')
        }
        req.logIn(user, function(err){
            if(err) {
                req.flash('error', 'You are not authorized to access this resource.');
                res.redirect('/')
            }
            return res.redirect('/manager/home');
        })
    })(req,res,next);

})
login.get('/manager/home', middleware.isManager,(req,res)=>{
    res.render('employee-manager');
})
login.get('/logout', middleware.isLoggedIn, (req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = login;
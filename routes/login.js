let express = require('express')
let login = express.Router()
let bcrypt = require('bcrypt');
const saltRounds = 10;

let db = require('../models')

login.get('/employee/login', (req,res)=>{
    res.render('login');
})
login.get('/employee/home', (req, res)=>{
    res.render('employee-home');
})

login.post('/employee/login', (req, res)=>{
    db.User.findOne({
        where: {
            id:req.body.id
        }
    }).then(data=>{
        let pw = data.getDataValue('password');
        console.log(pw);
        // bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
            bcrypt.compare(req.body.password, pw, (err, response)=>{
                if(response){
                    res.redirect('/employee/home');
                }else{
                    res.redirect('/employee/login')
                }
            })
        // })
    })
        
    
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

module.exports = login;
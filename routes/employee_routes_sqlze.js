
let express = require('express')
let router = express.Router()
let db = require('../models')
let moment = require('moment');
moment().format();

router.post('/api/employees', function (req, res) {
    db.TimeSheet.create({
        UserId: req.body.UserId,
        punch_code: req.body.punch_code
    }).then(data=>{
        res.json(data).end();
    }).catch(err=>{
        console.log(err);
        res.status(404).end();
    })

})

router.get('/api/employees/', (req,res)=>{
    db.TimeSheet.findAll({
        where: {
            id: req.user.id
        }
    }).then(data =>{
        res.json(data);
    }).catch(err=>{
        res.status(404).end();
    })
})

router.post('/api/employees/edit', (req,res)=>{
    db.TimeSheet.update({
        createdAt: req.body.time_punch
    }).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.status(404).end();
    })
})

router.post('/api/employees/addpunch', (req,res)=>{
    let date = moment(req.body.date);
    console.log(date);
    date.hour(req.body.time_punch/100);
    console.log(date);
    date.format('YYYY-MM-DD HH:mm:ss')
    console.log(date);
    db.TimeSheet.create({
        UserId: req.user.id,
        punch_code: req.body.punch_code,
        createdAt: date
    }).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.status(404).end();
    })
})


module.exports = router;
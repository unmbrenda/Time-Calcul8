
let express = require('express')
let router = express.Router()
let db = require('../models')
let middleware = require('../middleware')
let moment = require('moment');
moment().format();

router.post('/api/employees', function (req, res) {
    db.TimeSheet.create({
        UserId: req.body.UserId,
        punch_code: req.body.punch_code
    }).then(data => {
        res.json(data).end();
    }).catch(err => {
        console.log(err);
        res.status(404).end();
    })

})

router.get('/api/employees', middleware.isManager, (req, res) => {
    db.User.findAll({
        where: {
            id: {
                [db.Sequelize.Op.notIn] : [10000, req.user.id]
            }
        }
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(404).end();
    })
})
router.post('/api/employees/updatePunch/:id', middleware.isManager, (req, res) => {
    let date = moment(req.body.date);
    let testDate = moment(req.body.date).format();
    let endDate = moment(req.body.date).hour(23).format();
    console.log(testDate);
    date.hour(req.body.time_punch / 100);
    console.log(date);
    date.format('YYYY-MM-DD HH:mm:ss')
    console.log(date);

    db.TimeSheet.update({
        punch_code: req.body.punch_code,
        createdAt: date
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(404).end();
    })



})

router.get('/api/employees/timesheet', (req, res) => {
    db.TimeSheet.findAll({
        where: {
            UserId: req.user.id
        }
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(404).end();
    })
})

router.get('/api/employees/timesheet/:id', middleware.isManager, (req, res) => {
    db.TimeSheet.findAll({
        where: {
            UserId: req.params.id
        }
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(404).end();
    })
})

router.post('/api/employees/timesheet/edit/:id', (req, res) => {
    db.TimeSheet.update({
        createdAt: req.body.time_punch
    }, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.status(404).end();
        })
})

router.post('/api/employees/addpunch', (req, res) => {
    let date = moment(req.body.date);
    let testDate = moment(req.body.date).utc().format();
    let endDate = moment(req.body.date).utc().hour(23).format();
    console.log(testDate);
    date.hour(req.body.time_punch / 100);
    console.log(date);
    date.format('YYYY-MM-DD HH:mm:ss')
    console.log(date);
    db.TimeSheet.findAll({
        where: {
            createdAt: {
                [db.Sequelize.Op.between]: [testDate, endDate]

            },
            UserId: req.user.id,
            punch_code: req.body.punch_code
        }
    }).then(data => {
        if (data.length > 0) {
            res.json({ message: `Already have a ${req.body.punch_code} for this day.` })
        } else {
            db.TimeSheet.create({
                UserId: req.user.id,
                punch_code: req.body.punch_code,
                createdAt: date
            }).then(data => {
                res.json(data);
            }).catch(err => {
                res.status(404).end();
            })
        }

    })

})



//use for manager adding in missed time for employee

router.post('/api/employees/addpunch/:id',middleware.isManager, (req, res) => {
    let date = moment(req.body.date);
    let testDate = moment(req.body.date).utc().format();
    let endDate = moment(req.body.date).utc().hour(23).format();
    console.log(testDate);
    console.log(endDate);
    date.hour(req.body.time_punch / 100);
    console.log(date);
    date.format('YYYY-MM-DD HH:mm:ss')
    console.log(date);
    db.TimeSheet.findAll({
        where: {
            createdAt: {
                [db.Sequelize.Op.between]: [testDate, endDate]

            },
            UserId: req.params.id,
            punch_code: req.body.punch_code
        }
    }).then(data => {
        if (data.length > 0) {
            res.json({ message: `Already have a ${req.body.punch_code} for this day.` })
        } else {
            db.TimeSheet.create({
                UserId: req.params.id,
                punch_code: req.body.punch_code,
                createdAt: date
            }).then(data => {
                res.json(data);
            }).catch(err => {
                res.status(404).end();
            })
        }

    })

})


module.exportsfÍEQóv
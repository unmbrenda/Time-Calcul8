var express = require('express')
var routerEMP = express.Router()

var employee = require('../models/employee.js')



router.get('api/employees/hours/:id', function (req, res) {
  var employ = req.params.id;

  if (employ.punch_code.clockOut) {
    // if clock in and clockout already happen. show this page
    employee.displayTimeWorked(req.params.id, function (result) {
      var timeWorked = {
        in: result.punchIN,
        out: result.punchOUT,
        day: result.DAY_OF_WEEK,
        hours: result.hoursWORKED
      }
      res.render('  ', timeWorked); // where to render?
    })
  }else {
    employee.selectOne(['time_punch', 'punch_code'], 'time_sheet', 'employee_id', req.params.id, function (data) {
      // sending to front end
      var employeeObj = {
        employee: data
      }
      res.render('index', employeeObj)
    })
  }
})

// clokc in/out for each employee
router.post('/api/employees', function (req, res) {
  employee.insertOne('time_sheet',
    [
      'employee_id',
      'time_punch',
      'punch_code'
    ],
    [
      req.body.employee_id,
      req.body.time_punch,
      req.body.punch_code
    ],

    function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end()
      } else {
        res.redirect('/')
        res.json({ employee_id: result.insertId })
      }
    })
})

router.post('/api/employees/:id', function (req, res) {
  employee.updateOne('users',
    [
      'email',
      'user_password',
      'address'
    ],
    [
      req.body.email,
      req.body.user_password,
      req.body.address
    ], 'employee_id', req.params.employee_id, function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end()
      } else {
        res.redirect('/')
        res.json({ employee_id: result.insertId })
      }
    })
})

module.exports = routerEMP

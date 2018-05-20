var express = require('express')
var router = express.Router()

var burgers = require('../models/employee.js')

router.get('/', function (req, res) {
  employee.selectAll(function (data) {
    // sending to front end
    var employeeObj = {
      employee: data
    }
    res.render('index', employeeObj)
  })
// response with data to index.html
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
      }
    })
})

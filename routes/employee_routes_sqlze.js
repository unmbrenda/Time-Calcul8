
let express = require('express')
let router = express.Router()
let db = require('../models')

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



module.exports = router;
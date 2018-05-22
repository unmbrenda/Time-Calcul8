
let models = require('../models');

let middlewareObj = {};

middlewareObj.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}




middlewareObj.isManager = (req,res,next)=>{
    if(req.isAuthenticated()){
    models.User.findOne({
        where:{
            id: req.body.id
        }
    }).then(response=>{
        if(response.getDataValue('PositionId')===2){
            next();
        }else{
            res.redirect('/manager/login')
        }
    })
}
}

module.exports = middlewareObj;
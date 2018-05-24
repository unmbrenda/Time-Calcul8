
let models = require('../models');

let middlewareObj = {};

middlewareObj.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.render('employee-login')
}




middlewareObj.isManager = (req,res,next)=>{
    if(req.isAuthenticated()){
    models.User.findOne({
        where:{
            id: req.user.id
        }
    }).then(response=>{
        if(response.getDataValue('PositionId')===2){
           return next();
        }else{
            res.render('manager-login');
        }
    })
}else{
    res.render('manager-login');
}
}

module.exports = middlewareObj;
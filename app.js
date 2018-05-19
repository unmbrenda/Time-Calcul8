let express = require('express');

let app = express();

let db = require('./models');















db.sequelize.sync({force: true}).then(()=>{
    app.listen(process.env.PORT | 3000, ()=>{
        console.log('Time Clock Server Running...');
        db.Position.create({
            position_title: "manager"
        })
        db.User.create({
            first_name: "John",
            last_name: "Lagmay",
            email: "jj@jj.com",
            password: "password",
            PositionId: "1"
        })
    })
})
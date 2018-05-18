let express = require('express');

let app = express();

let db = require('./models');















db.sequelize.sync({force: true}).then(()=>{
    app.listen(process.env.PORT | 3000, ()=>{
        console.log('Time Clock Server Running...');
    })
})
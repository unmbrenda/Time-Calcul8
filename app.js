let express = require('express');
let app = express();
let exphbs = require('express-handlebars')
let path = require('path')
let bodyParser = require('body-parser');



app.set("views", path.join(__dirname, '/views'));
app.engine("handlebars", exphbs({ defaultLayout: "index" }));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}));
let db = require('./models');

let loginRoute = require('./routes/login.js');

app.use(loginRoute);











db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log('Time Clock Server Running...');
        // db.Position.create({
        //     position_title: "manager"
        // })
        // db.User.create({
        //     first_name: "John",
        //     last_name: "Lagmay",
        //     email: "jj@jj.com",
        //     password: "password",
        //     PositionId: "1"
        // })
    })
})
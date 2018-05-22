let express = require('express');
let app = express();
let exphbs = require('express-handlebars')
let path = require('path')
let bodyParser = require('body-parser');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
var session = require("express-session")

let db = require('./models');
let bcrypt = require('bcrypt');
app.set("views", path.join(__dirname, '/views'));
app.engine("handlebars", exphbs({ defaultLayout: "index" }));
app.set('view engine', 'handlebars')

passport.use(new LocalStrategy((username, password, done)=>{
    db.User.findOne({
        where: {
            id: username
        }
    }).then(data=>{
        let pw = data.getDataValue('password');
        console.log(pw);
        // bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
            bcrypt.compare(password, pw, (err, response)=>{
                if(err){
                    return done(null, false, {message: 'Incorrect username or password'});
                }
                return done(null, data);
            })
    })
}))
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.User.findById(id).then(user =>{
       
      done(null, user);
    });
  });
app.use(express.static("public"));
app.use(session({ secret: "money", resave: false, saveUninitialized: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
 });


app.get('/', (req,res)=>{
    res.render('index')
})
let loginRoute = require('./routes/login.js');
let { htmlRouter } = require('./routes/html_router');

app.use(loginRoute);


//should go before error handling but after api
app.use('/', htmlRouter);











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
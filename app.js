var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require("express-handlebars");

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo");
const DbConnectionString = "mongodb+srv://chandrapal3000:Chandra123@cluster0.i8kkx.mongodb.net/?retryWrites=true&w=majority";
var app = express();
mongoose.connect(DbConnectionString);
const {MongoClient} = require('mongodb');


// {
//   useNewUrlParser:true,
//   useCreateIndex : true,
//   useUnifiedTopology:true,
//   useFindAndModify:false,
// }

app.use(session({
  secret : "mysupersecret", 
  resave:false, 
  saveUninitialized:false,
  // store: MongoStore.create({ MongoClient }),
  cookie : {maxAge: 180*60*1000},
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',expressHbs.engine({defaultLayout:'layout',extname:'.hbs'}));
// app.engine('.hbs', expressHbs({extname: '.hbs', defaultLayout: false})) 
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req,res,next)=>{
//   res.locals.session = req.session;
//   next();
// })

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.get('/account',(req,res)=>{
  res.render('account/index');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

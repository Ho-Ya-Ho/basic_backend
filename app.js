var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var {sequelize} = require('./models/index');
sequelize.sync();


var testRouter = require('./routes/asdf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);





app.listen(4000, function() {
  console.log(`Example app listening at http://localhost:4000`)
});


app.get('/pet', function(req, res){
  res.send('펫용품 쇼핑 페이지임');
});
app.get('/beauty', function(req, res){
  res.send('뷰티용품 쇼핑 페이지임');
});

app.use(express.static('views/Google Web'));






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', testRouter);

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












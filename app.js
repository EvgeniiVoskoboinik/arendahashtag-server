const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../arenda-hashtag-client/dist')));

app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../arenda-hashtag-client/dist/index.html'));
});

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3003');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', 1728000);
    next();
};
app.use(allowCrossDomain);
app.options('*', function (req, res, next) {
    res.status(200).end();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end();
});

module.exports = app;

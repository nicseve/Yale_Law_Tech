const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const router = require('./backend/routes');
const path = require('path');
const cookieParser = require('cookie-parser');


// configure passport
const passport = require('passport');
const session = require('express-session');
const configPassport = require('./backend/passport');
configPassport(passport);

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'yalelawtechwasagreatclass' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Login Route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/layouts/login.html');
});

//Authentication Routes
const auth = require('./backend/auth');
auth(app, passport);

// routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

/* ********** error handlers ********** */

// app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


app.listen(port, function() {
  console.log('Server started! Listening on port %s', port);
});

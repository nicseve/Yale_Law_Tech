const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const router = require('./routes');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

// app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

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


// var stud_info = new Student({
//   name: studentdata[0]['Name'],
//   url: studentdata[0]['URL'],
//   lat: studentdata[0]['Latitude'],
//   long: studentdata[0]['Longitude']
// });
//
// stud_info.save(function(err) {
//   console.log("results of save:", err);
// })

// studentdata.forEach(function(stud, i) {
//   var stud_info = new Student({
//     name: stud['Name'],
//     url: stud['URL'],
//     lat: stud['Latitude'],
//     long: stud['Longitude']
//   })
// })

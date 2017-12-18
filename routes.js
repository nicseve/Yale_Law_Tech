const express = require('express');
const router = express.Router();
const path = require('path');

var studentdata = require('./public/students');
console.log("at 0:", studentdata[0]);

router.get('/', (req, res) => {
  console.log('in / route!');
  res.sendFile(path.join(__dirname + '/public/index_markers.html'));
});

router.get('/markers', (req, res) => {
  console.log('in /markers route!');
  res.sendFile(path.join(__dirname + '/public/index_images.html'));
});

router.get('/heatmap', (req, res) => {
  console.log('in /heatmap route!');
  res.sendFile(path.join(__dirname + '/public/index_heat.html'));
});

var markers = ["amanda"];

studentdata.forEach(function(std, i) {
  markers[i] = {
    lat: std.Latitude,
    long: std.Longitude,
    icon: std.URL
  }
})

router.get('/Kpcr1ukvkd9toBN3dAWE', function(req, res) {
  // res.send("hello!");
  console.log('in map route! -- ', studentdata[0]);

  res.send(JSON.stringify(markers));

  // res.write(studentdata);

});

module.exports = router;

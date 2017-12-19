const express = require('express');
const router = express.Router();
const path = require('path');
var studentdata = require('../public/students');

// ROUTES for different types of maps
router.get('/', (req, res) => {
  console.log('in / route!');
  res.sendFile(path.join(__dirname + '/public/layouts/index_markers.html'));
});

router.get('/markers', (req, res) => {
  console.log('in /markers route!');
  res.sendFile(path.join(__dirname + '/public/layouts/index_images.html'));
});

router.get('/heatmap', (req, res) => {
  console.log('in /heatmap route!');
  res.sendFile(path.join(__dirname + '/public/layouts/index_heat.html'));
});

// process student json, create markers obj
var markers = ["amanda"];
studentdata.forEach(function(std, i) {
  markers[i] = {
    col: std.College,
    lat: std.Latitude,
    long: std.Longitude,
    icon: std.URL
  }
})

// ROUTE to get student json
router.get('/Kpcr1ukvkd9toBN3dAWE', function(req, res) {
  console.log('in map route! -- ', studentdata[0]);
  res.send(JSON.stringify(markers));
});

module.exports = router;

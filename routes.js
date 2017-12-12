const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


router.get('/example', function(req, res) {
  res.send("hello!");
});

module.exports = router;

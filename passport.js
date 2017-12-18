var GoogleStrategy = require('passport-google-oauth20').Strategy;

// // load up the user model
// var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');

configAuth = {
  'clientID'      : process.env.GOOGLE_CLIENT_ID || '',
  'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET || '',
  'callbackURL'   : 'http://localhost:3000/auth/google/callback'
}

module.exports = function(passport) {
  var GoogleStrategy = require('passport-google-oauth20').Strategy;

  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        console.log('in passport google strategy');
        return cb(err, user);
      // });
    }
  ));
}

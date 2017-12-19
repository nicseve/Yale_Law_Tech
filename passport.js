var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {

  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://yalelawtech.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        console.log('in passport google strategy', accessToken);
        const user = {
            googleId: profile.id,
            accessToken: accessToken,
            displayName: profile.name
        };
        return cb(null, user);
      // });
    }
  ));
}

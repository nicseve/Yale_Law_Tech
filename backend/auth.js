module.exports = function (app, passport) {
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  app.get('/auth/google',
    passport.authenticate('google',
      {
        scope : ['email'],
        accessType: 'offline',
        prompt: 'consent',
        hd: 'yale.edu'
      }
    )
  );

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect : '/markers',
      failureRedirect : '/login'
    })
  );

  //Login Wall!
  app.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  });
}

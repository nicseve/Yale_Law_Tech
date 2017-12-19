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
        prompt: 'consent'
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

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        res.cookie('accessToken', req.user.accessToken, { expires: 0 });
        res.redirect('/markers');
    });

  //Login Wall!
  app.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  });
}

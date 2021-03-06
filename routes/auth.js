
module.exports = (app, passport) => {

    app.get('/auth/github',
        passport.authenticate('github', {
            scope:
                [
                    'read:user',
                    "admin:repo_hook",
                    "repo:status"
                ]
        }),
        function (req, res) {
            // The request will be redirected to GitHub for authentication, so this
            // function will not be called.
        });

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/MyProjects');
        }
    );

    app.get('/auth/github/logout', function (req, res) {
        req.logout();
        res.redirect('/');
      });

}






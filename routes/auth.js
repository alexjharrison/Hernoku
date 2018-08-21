
module.exports = (app, passport) => {

    app.get('/auth/github',
        passport.authenticate('github', {
            scope:
                [
                    'read:user',
                    "write:repo_hook",
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
            console.log(req);
            res.redirect('/MyProjects');
        }
    );

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
      });

}






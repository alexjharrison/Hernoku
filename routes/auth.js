
module.exports = (app, passport) => {

    app.get('/auth',
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

    app.get('/auth/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            console.log(req);
            res.redirect('/');
        }
    );

}






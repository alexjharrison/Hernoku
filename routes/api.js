const db = require("../models");




function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    // res.redirect('/login')
    res.send(false);
}



module.exports = app => {

    app.get("/api/authCheck",ensureAuthenticated,(req,res)=>{
        res.send(true);
    })

    app.get("/api/hostedProjects",ensureAuthenticated,(req,res)=>{
        db.Project.findAll({})
        .then(result => {
            res.send(result);    
        }).catch((err) => {
            res.send(err);
        });
    })

    // Send every request to the React app
    // Define any API routes before this runs
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });

}
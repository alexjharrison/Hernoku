const db = require("../models");
const axios = require("axios");
const JSON = require('circular-json');
const fs = require("fs");


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    // res.redirect('/login')
    res.send(false);
}



module.exports = app => {

    app.get("/api/authCheck",ensureAuthenticated,(req,res)=>{
        // console.log(req.user.profile.displayName);
        res.send({
            displayName: req.user.profile.displayName,
            username: req.user.profile.username
        });
    })

    app.get("/api/public",(req,res)=>{
        db.Project.findAll({where:{isPublic:true}})
        .then(result=> {
            res.send(result);
        }).catch(err=>{
            res.send(err);
        })
    })

    app.get("/api/hostedProjects",ensureAuthenticated,(req,res)=>{
        db.Project.findAll({})
        .then(result => {
            res.send(result);    
        }).catch((err) => {
            res.send(err);
        });
    })

    app.get("/api/getGitRepos",ensureAuthenticated,(req,res)=>{
        axios.get("https://api.github.com/user/repos?access_token="+req.user.accessToken)
        .then(response=>{
            // console.log(response.data);
            // fs.writeFile("apicall.json",JSON.stringify(response.data),"utf-8",(err=>{}));
            res.send(response.data);
        })
        .catch(err=>res.send(err));
    })

    app.get("/api/myDeployed/:username",(req,res)=>{
        var username = req.params.username;
        db.Project.findAll({where:{username:username}})
        .then(result => {
            res.send(result);
        }).catch(err=>{
            res.send(err);
        })
    })

    app.get("/api/findProj/:projName",(req,res)=>{
        var projName = req.params.projName;
        db.Project.findOne({where:{repoName:projName}})
        .then(result=>{
            res.send(result);
        }).catch(err=>res.send(err));
    })

    app.post("/api/addProj",(req,res)=> {
        console.log(req);
    })

    // Send every request to the React app
    // Define any API routes before this runs
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });

}
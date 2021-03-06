const db = require("../models");
const axios = require("axios");
const JSON = require('circular-json');
const fs = require("fs");
const path = require("path");


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    // res.redirect('/login')
    res.send(false);
}



module.exports = app => {

    app.get("/api/authCheck", ensureAuthenticated, (req, res) => {
        // console.log(req.user.profile.displayName);
        res.send({
            displayName: req.user.profile.displayName,
            username: req.user.profile.username
        });
    })

    app.get("/api/public", (req, res) => {
        db.Project.findAll({ where: { isPublic: true } })
            .then(result => {
                res.send(result);
            }).catch(err => {
                res.send(err);
            })
    })

    app.get("/api/hostedProjects", ensureAuthenticated, (req, res) => {
        db.Project.findAll({})
            .then(result => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
    })

    app.get("/api/getGitRepos", ensureAuthenticated, (req, res) => {
        axios.get("https://api.github.com/user/repos?access_token=" + req.user.accessToken)
            .then(response => {
                // console.log(response.data);
                // fs.writeFile("apicall.json",JSON.stringify(response.data),"utf-8",(err=>{}));
                res.send(response.data);
            })
            .catch(err => res.send(err));
    })

    app.get("/api/myDeployed/:username", (req, res) => {
        var username = req.params.username;
        db.Project.findAll({ where: { username: username } })
            .then(result => {
                res.send(result);
            }).catch(err => {
                res.send(err);
            })
    })

    app.get("/api/findProj/:projName", (req, res) => {
        var projName = req.params.projName;
        db.Project.findOne({ where: { repoName: projName } })
            .then(result => {
                res.send(result);
            }).catch(err => res.send(err));
    })

    app.post("/api/addProj", (req, res) => {
        console.log(req.body);
        if (!req.body.description) req.body.description = ("");
        db.Project.create({
            username: req.body.username,
            repoLink: req.body.repoLink,
            repoName: req.body.projName,
            description: req.body.description,
            fullStack: req.body.fullStack,
            react: req.body.react,
            gitLink: req.body.gitLink,
            hookLink: req.body.hookLink,
            isPublic: req.body.isPublic,
            envs: req.body.envs
        })
        res.send("success");
    })

    app.post("/api/addHook",ensureAuthenticated, (req, res) => {
        const hookLink = req.body.hookURL + "?access_token=" + req.user.accessToken;
        axios.post(hookLink, {
            name: "web",
            config: {
                url: "http://hernoku.us/api/pushNotice",
                content_type: "json",
            },
            events: ["push"],
            active: true
        }).then(response=>{
            res.send(response)
        }).catch(err=>{res.send(err)})
    })
    app.post("/api/removeHook",ensureAuthenticated, (req, res) => {
        const hookLink = req.body.hookURL + "?access_token=" + req.user.accessToken;
        axios.get(hookLink, {
            name: "web",
            config: {
                url: "http://hernoku.us/api/pushNotice",
                content_type: "json",
            },
            events: ["push"],
            active: true
        }).then(response=>{
            console.log(response.data);
            const myHook = response.data.filter(hook=>
                hook.config.url==='http://hernoku.us/api/pushNotice'
            );
            console.log(myHook);
            const hookID = myHook[0].url + "?access_token=" + req.user.accessToken;
            console.log(hookID);
            axios.delete(hookID).then(r=>res.send("success")).catch(err=>{res.send(err)});
        }).catch(err=>{
            console.log(err)
            res.send(err)})
    })

    app.delete("/api/remove/:proj", (req, res) => {
        const proj = req.params.proj;
        db.Project.destroy({ where: { repoName: proj } });
        res.send("success");
    })

    // Send every request to the React app
    // Define any API routes before this runs
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

}
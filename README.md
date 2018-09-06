# Hernoku App

Explanation of app can be found here
https://drive.google.com/file/d/1iRTeyiCIS78nosRNYhU_DiVEGCi9Av7A/view?usp=sharing

## Goals

Hernoku is a full stack React web app that can be used to host any github project on a Raspberry Pi.

It is compatible with projects that work on both Heroku & Github Pages.

The Hernoku project is the site where users can add, modify and delete projects from the Pi

## Companion App

[Github Puller Proxy](https://github.com/alexjharrison/Github-Puller-Proxy) is the companion app to Hernoku which hosts the backend code and manages all the live projects on the site.

GPP also listens for webhooks made when a github branch is updated.  When this occurs, it redownloads the projects and runs the updated code.

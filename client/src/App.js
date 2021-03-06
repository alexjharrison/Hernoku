import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddProj from "./pages/AddProj";
import MyProjx from "./pages/MyProjx";
import Settings from "./pages/Settings";
import NoMatch from "./pages/NoMatch";


class App extends Component {
  state = {
    stuff:"stuff"
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/AddProject" component={AddProj} />
            <Route exact path="/MyProjects" component={MyProjx} />
            <Route path="/Settings" component={Settings} />
            <Route component={NoMatch} />
            
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React from 'react';
import API from "../../utils/API";
import PubProjItem from "./PubProjItem";
import "./Home.css";

class Home extends React.Component {
    state = {
        loggedIn: false,
        allProjects: []
    }
    componentDidMount() {
        API.amAuthenticated().then(res => {
            this.setState({ loggedIn: res.data });
            console.log(this.state.loggedIn);
        })
        API.getAllProjects().then(res => {
            this.setState({ allProjects: res.data });
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                <h1 className="center-align">Hosted Projects</h1>
                <div className="row center">
                    <a href="/auth" id="github-btn" className="btn blue-grey darken-3 btn-large waves-effect">
                        <img id="gitlogo" src="images/github.jpg" alt="github logo"/>
                        Login in with GitHub!
                    </a>
                </div>
                
                <div className="row">
                    {
                        this.state.allProjects.map(project=><PubProjItem key={project.id} project={project} />)
                    }
                </div>
            </div>
        )
    }
}

export default Home;
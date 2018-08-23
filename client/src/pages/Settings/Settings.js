import React from 'react';
import Navbar from "../../components/Navbar";
import API from "../../utils/API";

class Settings extends React.Component {
    state = {
        loggedIn: false,
        projName: window.location.pathname.slice(10),
        username: "",
        description: "",
        fullStack: true,
        react: false,
        gitLink: "",
        hookLink: "",
        isPublic: true,
        envNames: [],
        envValues: []
    }

    componentDidMount() {
        API.amAuthenticated().then(res => {
            this.setState({ loggedIn: res.data });
            if (this.state.loggedIn === false) window.location = "/";
        }).catch(err => {
            console.log(err);
        });
        API.getAllMyRepos()
            .then(res => {
                const thisProj = res.data.filter(proj=>proj.name===this.state.projName)[0];
                this.setState({
                    username: this.state.loggedIn.username,
                    repoLink: thisProj.html_url,
                    description: thisProj.description,
                    fullStack: false,
                    react: false,
                    gitLink: thisProj.clone_url,
                    hookLink: thisProj.hooks_url,
                    isPublic: false,
                    envNames: [],
                    envValues: []
                });         
            }).catch(err => { console.log(err) })
    }

    saveProject = event => {
        event.preventDefault();
        const fullStack = document.querySelector('input[name="stack"]:checked').value;
        const react = document.querySelector('input[name="react"]:checked').value;
        const isPublic = document.querySelector('input[name="public"]:checked').value;
        this.setState({ 
            fullStack: fullStack,
            react:react,
            isPublic:isPublic
        })
        API.addProject(this.state).then(res=>{
            window.location.href = "/";
        });
        
    }


    render() {
        return (
            <div>
                <Navbar loggedIn={this.state.loggedIn} />
                <h1>Deployment Settings</h1>
                <h4>{this.state.projName}</h4>
                <form id="stuff">
                    <p> Github Pages or Heroku Compatible?<br />
                        <label>
                            <input name="stack" type="radio" value="false" checked />
                            <span>Github</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="stack" type="radio" value="true" />
                            <span>Heroku</span>
                        </label>
                    </p>
                    <p>Built with React?<br />
                        <label>
                            <input name="react" type="radio" value="true" checked />
                            <span>Yup</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="react" type="radio" value="false" />
                            <span>Nope</span>
                        </label>
                    </p>
                    <p>Make this project public?<br />
                        <label>
                            <input name="public" type="radio" value="true" checked />
                            <span>Yup</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="public" type="radio" value="false" />
                            <span>Nope</span>
                        </label>
                    </p>
                </form>
                <button onClick={this.saveProject} className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </div>

        )
    }
}

export default Settings;
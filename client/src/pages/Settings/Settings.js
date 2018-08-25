import React from 'react';
import Navbar from "../../components/Navbar";
import API from "../../utils/API";

class Settings extends React.Component {
    state = {
        loggedIn: false,
        projName: window.location.pathname.slice(10),
        username: "",
        description: "",
        fullStack: "false",
        react: "true",
        gitLink: "",
        hookLink: "",
        isPublic: "true",
        envs: ""
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
                const thisProj = res.data.filter(proj => proj.name === this.state.projName)[0];
                this.setState({
                    username: this.state.loggedIn.username,
                    repoLink: thisProj.html_url,
                    description: thisProj.description,
                    gitLink: thisProj.clone_url,
                    hookLink: thisProj.hooks_url
                });
            }).catch(err => { console.log(err) })
    }

    saveProject = event => {
        event.preventDefault();
        if (this.state.fullStack !== "" || this.state.react !== "" || this.state.isPublic !== "") {
            API.attachHook(this.state.hookLink).then(res => {
                API.addProject(this.state).then(res => {
                    window.location.href = "/MyProjects"
                }).catch(err=>console.log(err));
                console.log(res);
            }).catch(err => console.log(err))
        }
    }

    radio = event => {
        console.log(event.target);
        const question = event.target.getAttribute("name");
        const value = event.target.value;
        this.setState({ [`${question}`]: value });
    }

    envChange = event => {
        event.preventDefault();
        this.setState({envs: event.target.value})
        console.log(event.target.value);
    }


    render() {
        return (
            <div>
                <Navbar loggedIn={this.state.loggedIn} />
                <h1>Deployment Settings</h1>
                <h4>{this.state.projName}</h4>
                <form>
                    <p> Github Pages or Heroku Compatible?<br />
                        <label>
                            <input onChange={this.radio} checked={this.state.fullStack === "false"} name="fullStack" type="radio" value={false} />
                            <span>Github</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input onChange={this.radio} checked={this.state.fullStack === "true"} name="fullStack" type="radio" value={true} />
                            <span>Heroku</span>
                        </label>
                    </p>
                    <p>Built with React?<br />
                        <label>
                            <input onChange={this.radio} checked={this.state.react === "true"} name="react" type="radio" value={true} />
                            <span>Yup</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input onChange={this.radio} checked={this.state.react === "false"} name="react" type="radio" value={false} />
                            <span>Nope</span>
                        </label>
                    </p>
                    <p>Make this project public?<br />
                        <label>
                            <input onChange={this.radio} checked={this.state.isPublic === "true"} name="isPublic" type="radio" value={true} />
                            <span>Yup</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input onChange={this.radio} checked={this.state.isPublic === "false"} name="isPublic" type="radio" value={false} />
                            <span>Nope</span>
                        </label>
                    </p>
                </form><br/>
                <h5>Environmental Variables</h5>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="textarea1" className="materialize-textarea" onChange={this.envChange} value={this.state.envs}></textarea>
                                <label htmlFor="textarea1">Copy contents of .env file here</label>
                            </div>
                        </div>
                    </form>
                </div>
                <button onClick={this.saveProject} className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </div>

        )
    }
}

export default Settings;
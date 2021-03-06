import React from 'react';
import Navbar from "../../components/Navbar";
import API from "../../utils/API";
import NewListItem from "./NewListItems";


class AddProj extends React.Component {

    state = {
        loggedIn: false,
        myProjects: [],
        allProjects: []
    }
    
    componentWillMount() {
        API.amAuthenticated().then(res=>{
            this.setState({loggedIn:res.data});
            if(this.state.loggedIn===false) window.location = "/";
            API.getMyDeployed(this.state.loggedIn.username)
            .then(response=>{
                this.setState({myProjects:response.data});
                console.log(response.data);
            }).catch(err=>{
                console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        });
        API.getAllMyRepos().then(res=>{
            this.setState({allProjects:res.data});
        }).catch(err=>console.log(err));
    }

    render() {
        return (
            <div>
                <Navbar loggedIn={this.state.loggedIn.displayName} />
                <h3>Welcome {this.state.loggedIn.displayName}</h3>
                <div className="container">
                    <ul className="collection s10 offset-s1">
                        <li className="collection-header"><h4>Choose a Repository to Deploy</h4></li>
                        {this.state.allProjects.map(project=>(
                            <NewListItem project={project} username={this.state.loggedIn.username} deployed={this.state.myProjects} key={project.url} />
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddProj;
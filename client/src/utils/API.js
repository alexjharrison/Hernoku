import axios from "axios";


export default {
    amAuthenticated: ()=> {
        return axios.get("/api/authCheck");
    },
    getAllProjects: ()=> {
        return axios.get("/api/public");
    },
    getAllMyRepos: ()=>{
        return axios.get("/api/getGitRepos");
    },
    getMyDeployed: username => {
        return axios.get("/api/myDeployed/"+username);
    },
    findProject: projectName => {
        return axios.get("/api/findProj/"+projectName);
    },
    addProject: attr => {
        return axios.post("/api/addProj",attr);
    }
}
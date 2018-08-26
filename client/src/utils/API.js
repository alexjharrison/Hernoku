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
    },
    removeProj: proj => {
        axios.post("http://hernoku.us/api/delete",proj)
        return axios.delete("/api/remove/"+{proj:proj});
    },
    attachHook: hookURL => {
        return axios.post("/api/addHook",{hookURL:hookURL});
    },
    removeHook: hookURL => {
        return axios.post("/api/removeHook",{hookURL:hookURL});
    }
}

import axios from "axios";


export default {
    amAuthenticated: ()=> {
        return axios.get("/api/authCheck");
    },
    getAllProjects: ()=> {
        return axios.get("/api/public");
    }
}
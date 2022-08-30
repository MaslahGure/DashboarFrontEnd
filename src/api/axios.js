import axios from "axios";

//NODE_ENV {Its value changes based on the mode : production or development}

//If in production
const BASE_URL = process.env.NODE_ENV === "production"
                        ?"/api"
                        :"http://localhost:3001/api"
//const BASE_URL ="http://localhost:3001";


export default axios.create({

    baseURL:BASE_URL
});
export const axiosPrivate = axios.create({

    baseURL:BASE_URL,
    headers:{ "Content-Type": "application/json"},
    withCredentials: true
    
});
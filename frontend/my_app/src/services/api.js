import axios from "axios";

const api = axios.create({
    baseURL: "https://reservation-app-production-349c.up.railway.app/api"
});

export default api;
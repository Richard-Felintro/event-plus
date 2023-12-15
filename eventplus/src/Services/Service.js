import axios from "axios";

const apiPort = '5000';
const localApiUri = `http://localhost:${apiPort}/api`;
const externalApiUri = "https://eventplus-richard.azurewebsites.net/api";

const api = axios.create({
    baseURL: externalApiUri
});

export default api;
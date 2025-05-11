import axios from "axios";

const backend_url = process.env.REACT_APP_API_BACKEND;
console.log(backend_url);
const instance = axios.create({
  baseURL: backend_url || "http://localhost:8080/api/v1",
  withCredentials: true,
});

export default instance;

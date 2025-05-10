import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BACKEND || "http://localhost:8080/api/v1",
});

export default instance;

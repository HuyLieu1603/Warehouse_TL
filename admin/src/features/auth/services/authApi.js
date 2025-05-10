import axios from "../../../services/axios";

export const login = (data) => axios.post("/login", data);
export const register = (data) => axios.post("/register", data);
export const checkAuth = () => axios.get("/check", { withCredentials: true });
export const logout = () => axios.post("/logout");

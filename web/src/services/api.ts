import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1919",
});

export default api;

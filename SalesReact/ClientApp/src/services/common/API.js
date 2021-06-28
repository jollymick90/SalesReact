import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:44301",
  responseType: "json"
});

export default http;
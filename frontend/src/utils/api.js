import axios from "axios";

const api = axios.create({
  baseURL: "https://one-6hcr.onrender.com", // Adjust the URL as needed
  // baseURL: "http://localhost:3000",
  withCredentials: true, // for cookies
});

export default api;

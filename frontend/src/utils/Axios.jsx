import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3000", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

//https://testing1-backend.onrender.com

export default Axios;

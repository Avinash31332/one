import axios from "axios";

const Axios = axios.create({
  baseURL: "https://one-6hcr.onrender.com", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

//currently using ---> https://one-6hcr.onrender.com

export default Axios;

//https://testing1-backend.onrender.com

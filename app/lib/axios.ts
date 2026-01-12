import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL
  withCredentials: true, // agar cookies / auth use karoge
});

export default API;

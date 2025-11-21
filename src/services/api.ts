import axios from "axios";
export const api = axios.create({
  baseURL: "https://senac-pti-back.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";
export const api = axios.create({
  baseURL: "https://senac-pti-back.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const whatsappAPI = axios.create({
  baseURL: "https://gate.whapi.cloud",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 1CWT1lUYDIIjAhJO3mQSV6l9QjNDbNSM"
  },
});

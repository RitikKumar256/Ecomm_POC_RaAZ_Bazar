import axios from 'axios';

export const API_URL = "http://localhost:5454";
export const DEPLOYED_URL = "https://zosh-bazzar-backend.onrender.com";

// change api

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {

const role = localStorage.getItem("role");

let token = null;

if (role === "ROLE_ADMIN") {
  token = localStorage.getItem("admin_jwt");
}

else if (role === "ROLE_SELLER") {
  token = localStorage.getItem("seller_jwt");
}

else if (role === "ROLE_CUSTOMER") {
  token = localStorage.getItem("customer_jwt");
}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
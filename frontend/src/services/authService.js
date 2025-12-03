import axios from "axios";

const API_BASE = "http://localhost:8080/api/auth";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function signup(user) {
  const res = await axios.post(`${API_BASE}/signup`, user);
  return res.data;
}

export async function login(credentials) {
  const res = await axios.post(`${API_BASE}/login`, credentials);
  return res.data;
}

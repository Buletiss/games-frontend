import axios from "axios";

const api = axios.create({
  baseURL: "https://games-test-api-81e9fb0d564a.herokuapp.com/api",
  headers: { "dev-email-address": "vinicius1997feitosa@gmail.com" },
  timeout: 5000,
  timeoutErrorMessage: "O servidor demorou para responder, tente mais tarde.",
});

export default api;

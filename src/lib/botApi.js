// src/lib/botApi.js
import axios from "axios";

function apiBase() {
  // Vite
  const vite = import.meta?.env?.VITE_API_BASE || "";
  if (vite) return vite;

  // CRA (Create React App)
  if (process.env.REACT_APP_API_BASE) return process.env.REACT_APP_API_BASE;

  // Local fallback: CRA usually runs on 3000
  if (typeof window !== "undefined" && window.location.port === "3000") {
    return "http://localhost:5001"; // <-- matches your server PORT
  }
  // As a safe default, still point to 5001
  return "http://localhost:5001";
}

const BASE = apiBase();

export async function fetchNews(topic = "web", limit = 5) {
  const { data } = await axios.get(`${BASE}/api/news`, {
    params: { topic, limit },
    timeout: 15000,
  });
  return data; // { ok, topic, items[] }
}

export async function askBrand(q) {
  const { data } = await axios.get(`${BASE}/api/faq`, {
    params: { q },
    timeout: 10000,
  });
  return data; // { ok, answer|null }
}

export async function askAI(question) {
  const { data } = await axios.post(
    `${BASE}/api/ai`,
    { question }, // <-- server expects { question }
    { timeout: 20000 }
  );
  // server returns { ok, text? } — normalize to { ok, answer }
  if (data?.text && !data.answer) data.answer = data.text;
  return data; // { ok, answer }
}

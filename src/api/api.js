const BASE_URL = "https://127.0.0.1:8000/";

import { useNavigate } from "react-router";
export async function apiClient(path, body, customConfig = {}) {
 
  const headers = { "Content-Type": "application/json" };
  if (customConfig.token) {
    headers["Authorization"] = "Bearer " + customConfig.token;
  }
  const config = {
    method: body ? "POST" : "GET",
    headers: { ...headers, ...customConfig.headers },
    body: body ? JSON.stringify(body) : undefined,
  }; 

  const response = await fetch(`${BASE_URL}${path}`, config);
  if (response.status === 401) {
     throw new Error("UNAUTHORIZED");
  }
  if (!response.ok) throw new Error("Erreur API");

  return response.json();
}

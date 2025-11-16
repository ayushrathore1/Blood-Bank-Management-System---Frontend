import api from "./api";
import { tokenManager } from "../utils/tokenManager";

export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.data.success) {
      tokenManager.setToken(response.data.token);
      tokenManager.setUser(response.data.user);
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.success) {
      tokenManager.setToken(response.data.token);
      tokenManager.setUser(response.data.user);
    }
    return response.data;
  },

  logout: () => {
    tokenManager.clearAll();
  },

  getCurrentUser: () => tokenManager.getUser(),

  isAuthenticated: () => !!tokenManager.getToken(),
};

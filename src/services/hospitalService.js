import api from "./api";

export const hospitalService = {
  getAllHospitals: async (params = {}) => {
    const response = await api.get("/hospitals", { params });
    return response.data;
  },

  getHospitalById: async (id) => {
    const response = await api.get(`/hospitals/${id}`);
    return response.data;
  },

  updateHospital: async (id, data) => {
    const response = await api.put(`/hospitals/${id}`, data);
    return response.data;
  },

  updateInventory: async (id, inventoryData) => {
    const response = await api.put(`/hospitals/${id}/inventory`, inventoryData);
    return response.data;
  },

  initializeInventory: async (id) => {
    const response = await api.post(`/hospitals/${id}/inventory/initialize`);
    return response.data;
  },

  deleteHospital: async (id) => {
    const response = await api.delete(`/hospitals/${id}`);
    return response.data;
  },
};

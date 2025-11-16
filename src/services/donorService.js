import api from "./api";

export const donorService = {
  getAllDonors: async (params = {}) => {
    const response = await api.get("/donors", { params });
    return response.data;
  },

  getDonorById: async (id) => {
    const response = await api.get(`/donors/${id}`);
    return response.data;
  },

  updateDonor: async (id, data) => {
    const response = await api.put(`/donors/${id}`, data);
    return response.data;
  },

  searchDonors: async (params) => {
    const response = await api.get("/donors/search", { params });
    return response.data;
  },

  deleteDonor: async (id) => {
    const response = await api.delete(`/donors/${id}`);
    return response.data;
  },
};

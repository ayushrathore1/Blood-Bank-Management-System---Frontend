import api from "./api";

export const seekerService = {
  getAllSeekers: async () => {
    const response = await api.get("/seekers");
    return response.data;
  },

  getSeekerById: async (id) => {
    const response = await api.get(`/seekers/${id}`);
    return response.data;
  },

  updateSeeker: async (id, data) => {
    const response = await api.put(`/seekers/${id}`, data);
    return response.data;
  },

  deleteSeeker: async (id) => {
    const response = await api.delete(`/seekers/${id}`);
    return response.data;
  },
};

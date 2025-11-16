import api from "./api";

export const requestService = {
  createRequest: async (requestData) => {
    const response = await api.post("/requests", requestData);
    return response.data;
  },

  getAllRequests: async (params = {}) => {
    const response = await api.get("/requests", { params });
    return response.data;
  },

  getRequestById: async (id) => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await api.get("/requests/my-requests");
    return response.data;
  },

  updateRequestStatus: async (id, status) => {
    const response = await api.put(`/requests/${id}/status`, { status });
    return response.data;
  },

  respondToRequest: async (id) => {
    const response = await api.post(`/requests/${id}/respond`);
    return response.data;
  },

  deleteRequest: async (id) => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  },
};

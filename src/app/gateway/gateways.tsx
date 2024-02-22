import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = 'https://example.com/api';

const apiGateway = {
  // Function for creating a new resource
  create: async (endpoint: string, data: any) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const response = await axios.post(`${BASE_URL}/${endpoint}`, data, { headers });
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || error.message) as string;
    }
  },

  // Function for reading data from the API
  read: async (endpoint: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const response = await axios.get(`${BASE_URL}/${endpoint}`, { headers });
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || error.message) as string;
    }
  },

  // Function for updating an existing resource
  update: async (endpoint: string, id: string, data: any) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data, { headers });
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || error.message) as string;
    }
  },

  // Function for deleting a resource
  delete: async (endpoint: string, id: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`, { headers });
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || error.message) as string;
    }
  },
};

export default apiGateway;

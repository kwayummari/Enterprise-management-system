import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_POKEMON_LIST_API_BASE_URL;

const apiGateway = {
    
  create: async (endpoint: string, data: any) => {
    try {
      const authToken = localStorage.getItem('authToken');
        const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || error.message) as string;
    }
  },


  read: async (endpoint: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const response = await axios.get(`${BASE_URL}${endpoint}`, { headers });
      return response.data;
    } catch (error: any) {
      throw (error.response?.data || error.message) as string;
    }
  },


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

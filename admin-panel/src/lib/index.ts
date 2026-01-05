import axios from 'axios';

export const dachillaAPI = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8063',
}); 
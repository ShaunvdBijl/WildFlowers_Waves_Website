import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const getProducts = (category) =>
  api.get('/products', { params: category ? { category } : {} }).then((res) => res.data);

export const getProductById = (idOrSlug) =>
  api.get(`/products/${idOrSlug}`).then((res) => res.data);

export const submitContactForm = (formData) =>
  api.post('/contact', formData).then((res) => res.data);

export default api;

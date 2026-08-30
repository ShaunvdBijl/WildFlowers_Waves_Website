// Intended path: /frontend/src/services/api.js
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

// ---------- Auth helper ----------
const authHeaders = (idToken) => ({ headers: { Authorization: `Bearer ${idToken}` } });

// ---------- Users ----------
export const syncUserProfile = (idToken, extra = {}) =>
  api.post('/users/sync', extra, authHeaders(idToken)).then((res) => res.data);

export const getMyProfile = (idToken) =>
  api.get('/users/me', authHeaders(idToken)).then((res) => res.data);

// ---------- Client orders ----------
export const getMyOrders = (idToken) =>
  api.get('/orders/me', authHeaders(idToken)).then((res) => res.data);

export const createOrder = (idToken, orderData) =>
  api.post('/orders', orderData, authHeaders(idToken)).then((res) => res.data);

// ---------- Admin: orders ----------
export const getAllOrdersAdmin = (idToken, status) =>
  api
    .get('/admin/orders', { ...authHeaders(idToken), params: status ? { status } : {} })
    .then((res) => res.data);

export const updateOrderStatus = (idToken, orderId, status) =>
  api
    .patch(`/admin/orders/${orderId}/status`, { status }, authHeaders(idToken))
    .then((res) => res.data);

// ---------- Admin: gallery ----------
export const createGalleryItem = (idToken, galleryData) =>
  api.post('/admin/gallery', galleryData, authHeaders(idToken)).then((res) => res.data);

export const getAdminGalleryItems = (idToken) =>
  api.get('/admin/gallery', authHeaders(idToken)).then((res) => res.data);

export default api;

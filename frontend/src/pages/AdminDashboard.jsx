// Intended path: /frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllOrdersAdmin } from '../services/api';
import GalleryUploadForm from '../components/GalleryUploadForm';
import OrderManagementTable from '../components/OrderManagementTable';

export default function AdminDashboard() {
  const { firebaseUser, profile } = useAuth();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null);

  const loadOrders = useCallback(async (token) => {
    setLoading(true);
    try {
      const data = await getAllOrdersAdmin(token);
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function init() {
      if (!firebaseUser) return;
      const token = await firebaseUser.getIdToken();
      setIdToken(token);
      loadOrders(token);
    }
    init();
  }, [firebaseUser, loadOrders]);

  const handleOrderUpdated = (updatedOrder) => {
    setOrders((prev) => prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)));
  };

  return (
    <div className="section">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p style={{ color: 'var(--grey-silver)', marginBottom: 32 }}>
          Signed in as {profile?.name} ({profile?.role})
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <button
            className="btn"
            onClick={() => setTab('orders')}
            style={tab === 'orders' ? { background: 'var(--blue-main)', color: 'var(--beige-alt)' } : undefined}
          >
            Order Management
          </button>
          <button
            className="btn"
            onClick={() => setTab('gallery')}
            style={tab === 'gallery' ? { background: 'var(--blue-main)', color: 'var(--beige-alt)' } : undefined}
          >
            Gallery Manager
          </button>
        </div>

        {tab === 'orders' &&
          (loading ? (
            <p>Loading orders...</p>
          ) : (
            <OrderManagementTable idToken={idToken} orders={orders} onOrderUpdated={handleOrderUpdated} />
          ))}

        {tab === 'gallery' && (
          <div style={{ maxWidth: 500 }}>
            <GalleryUploadForm idToken={idToken} onItemCreated={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
}

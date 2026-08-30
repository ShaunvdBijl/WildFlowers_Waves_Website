// Intended path: /frontend/src/pages/ClientDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../services/api';
import OrderList from '../components/OrderList';

export default function ClientDashboard() {
  const { firebaseUser, profile } = useAuth();
  const [tab, setTab] = useState('active');
  const [orders, setOrders] = useState({ active: [], history: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const idToken = await firebaseUser.getIdToken();
        const data = await getMyOrders(idToken);
        setOrders(data);
      } catch (err) {
        setError('Could not load your orders. Please try again shortly.');
      } finally {
        setLoading(false);
      }
    }
    if (firebaseUser) fetchOrders();
  }, [firebaseUser]);

  return (
    <div className="section">
      <div className="container">
        <h1>Welcome back{profile?.name ? `, ${profile.name}` : ''}</h1>
        <p style={{ color: 'var(--grey-silver)', marginBottom: 32 }}>{profile?.email}</p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <button
            className="btn"
            onClick={() => setTab('active')}
            style={tab === 'active' ? { background: 'var(--blue-main)', color: 'var(--beige-alt)' } : undefined}
          >
            Active Orders
          </button>
          <button
            className="btn"
            onClick={() => setTab('history')}
            style={tab === 'history' ? { background: 'var(--blue-main)', color: 'var(--beige-alt)' } : undefined}
          >
            Past Purchases
          </button>
        </div>

        {loading ? (
          <p>Loading your orders...</p>
        ) : error ? (
          <p style={{ color: 'crimson' }}>{error}</p>
        ) : tab === 'active' ? (
          <OrderList orders={orders.active} emptyMessage="You have no active orders right now." />
        ) : (
          <OrderList orders={orders.history} emptyMessage="No past purchases yet." />
        )}
      </div>
    </div>
  );
}

// Intended path: /frontend/src/components/OrderManagementTable.jsx
import React, { useState } from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { updateOrderStatus } from '../services/api';

export default function OrderManagementTable({ idToken, orders, onOrderUpdated }) {
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(idToken, orderId, status);
      onOrderUpdated?.(updated);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!orders || orders.length === 0) {
    return <p style={{ color: 'var(--grey-silver)' }}>No orders to review yet.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--beige-outline)' }}>
            <th style={{ padding: 12 }}>Order</th>
            <th style={{ padding: 12 }}>Client</th>
            <th style={{ padding: 12 }}>Items</th>
            <th style={{ padding: 12 }}>Total</th>
            <th style={{ padding: 12 }}>Status</th>
            <th style={{ padding: 12 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{ borderBottom: '1px solid var(--beige-outline)' }}>
              <td style={{ padding: 12 }}>#{order._id.slice(-6).toUpperCase()}</td>
              <td style={{ padding: 12 }}>
                {order.userId?.name}
                <br />
                <span style={{ fontSize: '0.8rem', color: 'var(--grey-silver)' }}>{order.userId?.email}</span>
              </td>
              <td style={{ padding: 12 }}>
                {order.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}
              </td>
              <td style={{ padding: 12 }}>R{order.totalAmount}</td>
              <td style={{ padding: 12 }}>
                <OrderStatusBadge status={order.status} />
              </td>
              <td style={{ padding: 12, whiteSpace: 'nowrap' }}>
                <button
                  className="btn btn-solid"
                  style={{ padding: '6px 14px', marginRight: 8 }}
                  disabled={updatingId === order._id || order.status === 'accepted'}
                  onClick={() => handleStatusChange(order._id, 'accepted')}
                >
                  Accept
                </button>
                <button
                  className="btn"
                  style={{ padding: '6px 14px' }}
                  disabled={updatingId === order._id || order.status === 'declined'}
                  onClick={() => handleStatusChange(order._id, 'declined')}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

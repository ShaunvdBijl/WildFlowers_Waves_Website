// Intended path: /frontend/src/components/OrderList.jsx
import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderList({ orders, emptyMessage }) {
  if (!orders || orders.length === 0) {
    return <p style={{ color: 'var(--grey-silver)' }}>{emptyMessage}</p>;
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      {orders.map((order) => (
        <div key={order._id} className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700 }}>Order #{order._id.slice(-6).toUpperCase()}</p>
              <p style={{ margin: 0, color: 'var(--grey-silver)', fontSize: '0.85rem' }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <ul style={{ margin: '12px 0 0', paddingLeft: 20 }}>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} &times; {item.quantity}
              </li>
            ))}
          </ul>

          <p style={{ textAlign: 'right', fontWeight: 700, color: 'var(--blue-main)', marginTop: 12 }}>
            Total: R{order.totalAmount}
          </p>
        </div>
      ))}
    </div>
  );
}

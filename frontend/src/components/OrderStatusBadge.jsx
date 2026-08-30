// Intended path: /frontend/src/components/OrderStatusBadge.jsx
import React from 'react';

const statusStyles = {
  pending: { background: '#fff3cd', color: '#8a6d00' },
  accepted: { background: '#d4edda', color: '#1e7e34' },
  declined: { background: '#f8d7da', color: '#a71d2a' },
  completed: { background: '#d1e7ff', color: 'var(--blue-dark)' },
};

export default function OrderStatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.pending;
  return (
    <span
      style={{
        ...style,
        padding: '4px 12px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '0.8rem',
        fontWeight: 700,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
}

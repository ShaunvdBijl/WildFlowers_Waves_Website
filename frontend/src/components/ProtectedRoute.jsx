// Intended path: /frontend/src/components/ProtectedRoute.jsx
//
// Usage:
//   <Route path="/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
//   <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { firebaseUser, profile, loading } = useAuth();

  if (loading) {
    return <div className="container section">Checking your session...</div>;
  }

  if (!firebaseUser) {
    return <Navigate to="/signup" replace />;
  }

  if (role && profile?.role !== role) {
    return (
      <div className="container section">
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return children;
}

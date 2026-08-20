// Placeholder login page - the brand brief only calls for a "Log In" nav item with
// no further spec, so this is a minimal starting point. Wire up real auth (e.g. JWT
// against a /api/auth route) when you're ready to add accounts.
import React, { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Authentication is not yet implemented.');
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 400 }}>
        <h1 style={{ textAlign: 'center' }}>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-solid">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

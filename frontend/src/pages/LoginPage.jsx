import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 420 }}>
        <h1 style={{ textAlign: 'center' }}>Log In</h1>
        <p style={{ textAlign: 'center', marginBottom: 32 }}>
          Sign in to view your orders with Wildflowers &amp; Waves.
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="btn"
          style={{ width: '100%', marginBottom: 24 }}
        >
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', color: 'var(--grey-silver)', marginBottom: 24 }}>
          or log in with email
        </div>

        <form onSubmit={handleEmailLogin}>
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
          <button type="submit" className="btn btn-solid" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Logging In...' : 'Log In'}
          </button>

          {error && <p style={{ color: 'crimson', marginTop: 16 }}>{error}</p>}
        </form>

        <p style={{ textAlign: 'center', marginTop: 24 }}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

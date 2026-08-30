// Intended path: /frontend/src/pages/SignUpPage.jsx
//
// UI is fully wired for Firebase - createUserWithEmailAndPassword and
// signInWithPopup(GoogleAuthProvider) are the two trigger points. On success,
// AuthContext's onAuthStateChanged listener automatically calls
// POST /api/users/sync, so no manual sync call is needed here.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      if (form.name) {
        await updateProfile(cred.user, { displayName: form.name });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong creating your account.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-up failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 420 }}>
        <h1 style={{ textAlign: 'center' }}>Create Your Account</h1>
        <p style={{ textAlign: 'center', marginBottom: 32 }}>
          Sign up to track your orders and enquiries with Wildflowers &amp; Waves.
        </p>

        <button
          onClick={handleGoogleSignUp}
          disabled={submitting}
          className="btn"
          style={{ width: '100%', marginBottom: 24 }}
        >
          Continue with Google
        </button>

        <div style={{ textAlign: 'center', color: 'var(--grey-silver)', marginBottom: 24 }}>
          or sign up with email
        </div>

        <form onSubmit={handleEmailSignUp}>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={6}
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-solid" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Creating Account...' : 'Sign Up'}
          </button>

          {error && <p style={{ color: 'crimson', marginTop: 16 }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

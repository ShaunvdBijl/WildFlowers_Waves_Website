import React, { useState } from 'react';
import { submitContactForm } from '../services/api';

const initialForm = { firstName: '', lastName: '', email: '', phone: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'submitting', message: '' });
    try {
      const res = await submitContactForm(form);
      setStatus({ state: 'success', message: res.message });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
        <p style={{ textAlign: 'center', marginBottom: 32 }}>
          Our friendly team is here to help - fill in the form below and we'll be in touch shortly.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="firstName">First Name (required)</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
          </div>

          <label htmlFor="email">Email (required)</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />

          <label htmlFor="message">Message (required)</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-solid" disabled={status.state === 'submitting'}>
            {status.state === 'submitting' ? 'Sending...' : 'Submit'}
          </button>

          {status.message && (
            <p style={{ marginTop: 16, color: status.state === 'error' ? 'crimson' : 'var(--blue-main)' }}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

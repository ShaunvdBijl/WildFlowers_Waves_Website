// Intended path: /frontend/src/components/GalleryUploadForm.jsx
//
// Accepts either a direct image URL, or a local file (captured as metadata -
// name/size/type). Wire the actual file upload to Firebase Storage / S3 /
// your CDN of choice, then pass the resulting hosted URL as `imageUrl` to
// POST /api/admin/gallery. For now, a local file selection just previews
// the filename so the form is ready to hook up.

import React, { useState } from 'react';
import { createGalleryItem } from '../services/api';

const categories = ['Woodworking', 'Woodcarving', 'Home Decor', 'Accessories', 'Other'];

const initialForm = { title: '', imageUrl: '', description: '', category: 'Woodworking' };

export default function GalleryUploadForm({ idToken, onItemCreated }) {
  const [form, setForm] = useState(initialForm);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    // TODO: upload `file` to your storage provider, then setForm({ ...form, imageUrl: hostedUrl })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) {
      setStatus({ state: 'error', message: 'Please provide an image URL (or wire up file upload).' });
      return;
    }
    setStatus({ state: 'submitting', message: '' });
    try {
      const item = await createGalleryItem(idToken, form);
      setStatus({ state: 'success', message: 'Gallery item added.' });
      setForm(initialForm);
      setFileName('');
      onItemCreated?.(item);
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.response?.data?.message || 'Failed to save gallery item.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 24 }}>
      <h3 style={{ marginTop: 0 }}>Add Gallery Item</h3>

      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={form.title} onChange={handleChange} required />

      <label htmlFor="imageUrl">Image URL</label>
      <input
        id="imageUrl"
        name="imageUrl"
        placeholder="https://..."
        value={form.imageUrl}
        onChange={handleChange}
      />

      <label htmlFor="fileUpload">Or select a local file</label>
      <input id="fileUpload" type="file" accept="image/*" onChange={handleFileSelect} />
      {fileName && (
        <p style={{ fontSize: '0.85rem', color: 'var(--grey-silver)' }}>Selected: {fileName}</p>
      )}

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" rows={3} value={form.description} onChange={handleChange} />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 10,
          border: '1px solid var(--beige-outline)',
          marginBottom: 16,
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-solid" disabled={status.state === 'submitting'}>
        {status.state === 'submitting' ? 'Saving...' : 'Save to Gallery'}
      </button>

      {status.message && (
        <p style={{ marginTop: 12, color: status.state === 'error' ? 'crimson' : 'var(--blue-main)' }}>
          {status.message}
        </p>
      )}
    </form>
  );
}

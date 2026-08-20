import React from 'react';

export default function WhatsAppWidget() {
  const number = process.env.REACT_APP_WHATSAPP_NUMBER || '27000000000';
  const message = encodeURIComponent('Hi Wildflowers & Waves! I have a question about your products.');

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
        zIndex: 100,
      }}
    >
      <span style={{ color: 'white', fontSize: '1.6rem' }}>💬</span>
    </a>
  );
}

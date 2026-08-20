import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--dark-blue)',
        color: 'var(--beige-alt)',
        padding: '40px 24px',
        marginTop: 64,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div>
          <h3 style={{ color: 'var(--beige-alt)', fontSize: '1.2rem' }}>Wildflowers &amp; Waves</h3>
          <p style={{ color: 'var(--beige-outline)', margin: 0 }}>Sustainable Design Studio</p>
          <p style={{ color: 'var(--beige-outline)', margin: 0 }}>Saint Helena Bay, Western Cape</p>
        </div>
        <div>
          <p style={{ color: 'var(--beige-outline)', margin: 0 }}>
            &copy; {new Date().getFullYear()} Wildflowers &amp; Waves. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

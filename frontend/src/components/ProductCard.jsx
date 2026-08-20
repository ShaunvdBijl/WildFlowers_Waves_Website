import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const image = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg';

  return (
    <Link to={`/product/${product.slug || product._id}`} className="card">
      <img src={image} alt={product.name} className="card-image" />
      <div className="card-body">
        <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>{product.name}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--grey-silver)' }}>{product.shortDescription}</p>
        {product.price !== undefined && (
          <p style={{ fontWeight: 700, color: 'var(--blue-main)', marginTop: 8 }}>R{product.price}</p>
        )}
      </div>
    </Link>
  );
}

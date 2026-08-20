import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(0);
      })
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container section">Loading product...</div>;
  if (error || !product)
    return (
      <div className="container section">
        <p>{error || 'Product not found.'}</p>
        <Link to="/gallery" className="btn">
          Back to Gallery
        </Link>
      </div>
    );

  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder.jpg'];

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          {/* Product image + thumbnail gallery */}
          <div style={{ flex: '1 1 400px' }}>
            <img
              src={images[activeImage]}
              alt={product.name}
              style={{ borderRadius: 'var(--radius-soft)', width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {images.map((img, idx) => (
                  <img
                    key={img + idx}
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: 'cover',
                      borderRadius: 8,
                      cursor: 'pointer',
                      border: activeImage === idx ? '2px solid var(--blue-main)' : '2px solid transparent',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div style={{ flex: '1 1 400px' }}>
            <h1>{product.name}</h1>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--blue-main)' }}>
              R{product.price}
            </p>
            <p>{product.detailedDescription}</p>

            <div style={{ marginTop: 24 }}>
              <h3>Wood Info</h3>
              <p>{product.woodType}</p>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3>Origin Story</h3>
              <p>{product.originStory}</p>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3>Care Details</h3>
              <p>{product.careDetails}</p>
            </div>

            <button className="btn btn-solid" style={{ marginTop: 24 }}>
              Enquire About This Piece
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Woodworking', 'Woodcarving', 'Home Decor', 'Accessories'];

export default function GalleryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    getProducts(activeCategory === 'All' ? undefined : activeCategory)
      .then(setProducts)
      .catch((err) => console.error('Failed to load products', err))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Gallery</h1>
        <p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
          Browse our handmade, sustainably crafted pieces - each one carved and finished by hand.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="btn"
              style={
                activeCategory === cat
                  ? { background: 'var(--blue-main)', color: 'var(--beige-alt)' }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading gallery...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No products found in this category yet.</p>
        ) : (
          <div className="grid grid-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { getProducts, getGalleryItems } from '../services/api';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Woodworking', 'Woodcarving', 'Home Decor', 'Accessories'];

export default function GalleryPage() {
  const [products, setProducts] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    const categoryParam = activeCategory === 'All' ? undefined : activeCategory;
    Promise.all([
      getProducts(categoryParam).catch((err) => {
        console.error('Failed to load products', err);
        return [];
      }),
      getGalleryItems(categoryParam).catch((err) => {
        console.error('Failed to load gallery items', err);
        return [];
      }),
    ])
      .then(([prodData, galleryData]) => {
        setProducts(prodData);
        setGalleryItems(galleryData);
      })
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
        ) : products.length === 0 && galleryItems.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No products found in this category yet.</p>
        ) : (
          <>
            {products.length > 0 && (
              <div className="grid grid-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {galleryItems.length > 0 && (
              <div style={{ marginTop: products.length > 0 ? 56 : 0 }}>
                <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Studio Gallery</h2>
                <div className="grid grid-3">
                  {galleryItems.map((item) => (
                    <div key={item._id} className="card">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                      />
                      <div style={{ padding: 20 }}>
                        <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                        {item.description && <p style={{ marginBottom: 0 }}>{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

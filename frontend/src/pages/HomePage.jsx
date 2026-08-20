import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setFeatured(data.slice(0, 3)))
      .catch((err) => console.error('Failed to load featured products', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem' }}>Wildflowers &amp; Waves</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: 600, margin: '0 auto 32px' }}>
            Handmade, sustainable woodworking and woodcarving from Saint Helena Bay - designed with
            a zero-waste policy and a love for the coast.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/gallery" className="btn btn-solid">
              Shop the Gallery
            </Link>
            <Link to="/about" className="btn">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="section section-dark">
        <div className="container">
          <h2 style={{ marginBottom: 32 }}>Featured Pieces</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : featured.length === 0 ? (
            <p>Products coming soon - check back shortly.</p>
          ) : (
            <div className="grid grid-3">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Intro blurb */}
      <section className="section">
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <h2>Sustainable, Eco-Friendly Design</h2>
          <p>
            We specialise in handmade artisan products, sold to locals and visitors at markets,
            festivals, and through local shops along the Western Cape coast.
          </p>
        </div>
      </section>
    </div>
  );
}

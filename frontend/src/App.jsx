// Intended path: /frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <WhatsAppWidget />
      <Footer />
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  );
}

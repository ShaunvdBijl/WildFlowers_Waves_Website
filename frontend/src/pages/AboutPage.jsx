import React from 'react';

const storyBlocks = [
  {
    title: 'Where It Began',
    text: 'Wildflowers & Waves started on the shores of Saint Helena Bay, where wood, wind, and water shaped everything we make.',
    image: '/placeholder-story-1.jpg',
    imageSide: 'right',
  },
  {
    title: 'Our Craft',
    text: 'Every piece is woodworked and woodcarved by hand, using a zero-waste approach that respects the material and the coastline it comes from.',
    image: '/placeholder-story-2.jpg',
    imageSide: 'left',
  },
  {
    title: 'Our Community',
    text: 'We sell at local markets and festivals, and through small shops - building relationships with the people who carry our work home.',
    image: '/placeholder-story-3.jpg',
    imageSide: 'right',
  },
];

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: 48 }}>Our Story</h1>

        {storyBlocks.map((block, idx) => (
          <div
            key={block.title}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 40,
              marginBottom: 64,
              flexDirection: block.imageSide === 'left' ? 'row-reverse' : 'row',
            }}
          >
            <div style={{ flex: '1 1 320px' }}>
              <h2>{block.title}</h2>
              <p>{block.text}</p>
            </div>
            <div style={{ flex: '1 1 320px' }}>
              <img
                src={block.image}
                alt={block.title}
                style={{ borderRadius: 'var(--radius-soft)', width: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

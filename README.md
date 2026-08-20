# Wildflowers & Waves - MERN + Docker Project

Full code for the Wildflowers & Waves website, based on the brand identity
proposal (colors, fonts, page structure, tone). All files were generated flat
so you can organize them into folders yourself. Each file has a comment at
the top noting its **intended path**.

## Suggested folder structure

```
wildflowers-and-waves/
├── docker-compose.yml
├── backend/
│   ├── package.json          <- backend-package.json
│   ├── server.js
│   ├── seed.js
│   ├── Dockerfile            <- Dockerfile-backend
│   ├── .env                  <- copy from backend.env.example
│   ├── config/
│   │   └── db.js              <- db-config.js
│   ├── models/
│   │   ├── Product.js         <- Product-model.js
│   │   └── Contact.js         <- Contact-model.js
│   └── routes/
│       ├── products.js        <- products-routes.js
│       └── contact.js         <- contact-routes.js
└── frontend/
    ├── package.json          <- frontend-package.json
    ├── Dockerfile            <- Dockerfile-frontend (dev) or Dockerfile-frontend-prod
    ├── .env                  <- copy from frontend.env.example
    ├── public/
    │   └── index.html         <- public-index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.jsx
        ├── services/
        │   └── api.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── WhatsAppWidget.jsx
        │   └── ProductCard.jsx
        └── pages/
            ├── HomePage.jsx
            ├── AboutPage.jsx
            ├── GalleryPage.jsx
            ├── ProductDetailsPage.jsx
            ├── ContactPage.jsx
            └── LoginPage.jsx
```

## What's implemented

- **Backend (Express + MongoDB/Mongoose)**
  - `Product` model: name, slug, descriptions, wood type, origin story, care
    details, price, images, category - matching the "Product Details Page"
    spec (picture, description, wood info & origin story, care details).
  - `Contact` model + route: saves submissions to MongoDB and optionally
    sends an automated notification email via Nodemailer (per the "Contact
    Page" brief: *"Fill form that sends us an automative email"*).
  - REST endpoints: `GET/POST /api/products`, `GET/PUT/DELETE /api/products/:id`,
    `POST /api/contact`, `GET /api/health`.
  - `seed.js` to populate sample products for local testing.

- **Frontend (React + React Router)**
  - Brand colors, fonts, and pill-style buttons implemented in `index.css`
    as CSS variables, matching the Colour Palette and Typography slides.
  - Pages: Home, About (alternating story layout), Gallery (filterable
    product grid), Product Details (image gallery + wood/origin/care info),
    Contact (form wired to the backend), and a placeholder Login page.
  - `Navbar` (centre navigation, logo, socials, login) and `Footer`.
  - Floating `WhatsAppWidget`, per the Website Aesthetic requirements.

- **Docker**
  - `Dockerfile-backend` for the Express API.
  - `Dockerfile-frontend` (dev server with hot reload) and
    `Dockerfile-frontend-prod` (nginx-served production build) as an
    alternative.
  - `docker-compose.yml` wiring MongoDB, backend, and frontend together with
    named volumes and a shared network.

## Not included / left for you

- The actual **Typewriter Basix** font files (paid/non-Canva-free license per
  the brand guide) - `index.css` references
  `src/assets/fonts/TypewriterBasix.woff2` and `.ttf`; add the purchased font
  files there.
- Real product photography, the W&W logo file, and icon assets referenced in
  the design (placeholders are used throughout).
- Authentication logic for the Login page (currently a non-functional form).
- Any CI/CD, testing, or production secrets management beyond the `.env.example` files.

## Running it locally with Docker

1. Copy `backend.env.example` → `backend/.env` and `frontend.env.example` →
   `frontend/.env`, filling in real values (at minimum, SMTP credentials if
   you want contact-form emails to send).
2. From the project root: `docker-compose up --build`
3. Frontend: http://localhost:3000  Backend API: http://localhost:5000/api
4. Optionally seed sample products: `docker exec -it ww-backend node seed.js`

# Wildflowers & Waves

Wildflowers & Waves is a MERN stack web application for a creative handmade goods and home decor brand. The platform allows customers to browse available products, place orders, view their past purchases, and connect directly with the business through WhatsApp and Facebook. It also includes an admin dashboard for order review, order status management, and product gallery updates.

## Project overview

This project is designed for a small business that needs both a storefront and a lightweight internal order management workflow. The frontend is built with React, while the backend is built with Express and Node.js, connected to MongoDB for persistent data storage. Firebase is used for authentication and role-based access, and Docker Compose is used to run the full app in a consistent local environment.

## Core features

### Customer features
- Browse products that are available in the store
- View product details and gallery items
- Place an order for products to be received and reviewed
- View past orders and current order status
- Connect directly to the business through WhatsApp and Facebook links

### Admin features
- View all customer orders in a single dashboard
- Approve or deny orders
- Update order status as the order moves through the process
- Add and manage product gallery images

### Technical features
- MERN stack architecture: MongoDB, Express, React, Node.js
- Docker and Docker Compose support for local development
- Firebase authentication and admin identity verification
- RESTful backend API for product, order, user, and contact operations

## Technology stack

- Frontend: React, React Router, Firebase, Axios
- Backend: Node.js, Express, Mongoose, Nodemailer
- Database: MongoDB
- Authentication: Google Firebase
- Containerisation: Docker and Docker Compose

## Project structure overview

The project is split into two main folders:

- backend/
  - API logic, configuration, models, routes, controllers, and middleware
  - Handles orders, products, users, contact form submissions, and admin access
- frontend/
  - React application for the customer and admin views
  - Includes pages, services, components, and routing

The root project includes:

- docker-compose.yml
- backend/Backend.Dockerfile
- frontend/Frontend.Dockerfile
- frontend/Prod.Dockerfile

This gives the application a complete full-stack setup with separate containerised backend and frontend services.

## Installation

No special installation requirements are required beyond having Docker and Docker Compose available on your machine.

### Recommended setup with Docker

1. Clone the repository.
2. Open the project root in your terminal.
3. Configure environment files:
   - Copy `backend/backend.env.example` to `backend/.env.backend` if needed
   - Copy the frontend example file if required for your local configuration
4. Start the application:

```bash
docker-compose up --build
```

5. Open the app in your browser:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

### Local development without Docker

If you prefer to run the modules directly:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm start
```

## Basic usage examples

### Customer browsing

Visit the homepage or gallery page to browse available products and open product details.

### Customer order flow

1. Sign in or create an account.
2. Browse product listings.
3. Place an order from the product or dashboard flow.
4. View order status in the client dashboard.

### Admin workflow

1. Sign in as an admin user.
2. Open the admin dashboard.
3. Review all orders.
4. Approve, deny, or update order status.
5. Add or update product gallery images.

### API examples

Check backend health:

```bash
curl http://localhost:5000/api/health
```

Fetch available products:

```bash
curl http://localhost:5000/api/products
```

## Configuration options

### Backend environment variables

The backend uses environment variables for MongoDB, CORS, email, and Firebase configuration. The project includes the main config file at `backend/.env.backend` and an example template at `backend/backend.env.example`.

Key variables include:
- `PORT`
- `MONGO_URI`
- `CLIENT_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_RECEIVER_EMAIL`
- Firebase admin credentials

### Frontend environment variables

The frontend environment file contains values such as:
- `REACT_APP_API_URL`
- `REACT_APP_WHATSAPP_NUMBER`
- Firebase web configuration values

These are used for the API connection, WhatsApp link, and authentication.

### WhatsApp and Facebook links

The business channels are accessible directly from the frontend. The default WhatsApp number is configured in the frontend environment file, and the Facebook link is included in the navigation component.

## Features overview

### Storefront experience
- Product catalog and product detail pages
- Designed for a creative artisan brand aesthetic
- Easy navigation for browsing and purchasing

### Order management
- Customer order creation
- Admin viewing of all orders
- Order approval and denial flow
- Order status updates
- Customer order history tracking

### Product gallery management
- Admins can add product gallery images
- Visual catalog updates for the business storefront

### Business outreach
- Direct WhatsApp access for customer communication
- Direct Facebook access from the site navigation

## Troubleshooting

### Docker containers fail to start

Check that Docker is running and that the environment files are valid.

```bash
docker-compose up --build
```

If the backend fails to connect to MongoDB, confirm that:
- MongoDB is running in Docker
- `MONGO_URI` points to the correct service name or local connection string
- The database container has started successfully

### Frontend cannot reach backend

Verify that:
- The backend is running on port 5000
- `REACT_APP_API_URL` matches the running API URL
- CORS is enabled for the frontend origin

### Firebase authentication issues

Check that:
- Firebase environment variables are present and correctly formatted
- The backend Firebase Admin SDK credentials are valid
- The frontend Firebase config matches the project setup

### Email sending fails

If the contact form or notifications fail:
- Review your SMTP host, port, username, and password
- Use an app password if using Gmail or a similar provider
- Ensure `CONTACT_RECEIVER_EMAIL` is a valid inbox address

## Contributing guidelines

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes in a focused and well-documented way.
4. Test the affected functionality locally.
5. Open a pull request with a clear description of the change.

When contributing:
- Keep the backend and frontend concerns separated
- Follow the existing project structure
- Document environment variables when adding new configuration
- Keep commits clean and specific

## License information

This project currently does not include a dedicated license file in the repository. Before publishing or distributing it publicly, confirm the ownership and add an appropriate license such as MIT, Apache 2.0, or another license that matches your intended use.

## Summary

Wildflowers & Waves is a complete full-stack storefront and admin platform for a business that needs product browsing, customer orders, order approvals, gallery management, and direct customer communication through social channels. The app is structured for local development with Docker and is ready to extend with additional features as the business grows.


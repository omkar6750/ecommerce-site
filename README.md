🛒 E-Commerce Site – Full-Stack Project
This is a complete, full-stack ecommerce site I built from scratch. It has everything you'd expect in a real online store — user accounts, product browsing, shopping cart, order placement, and even an admin dashboard to manage products. I designed it to be clean, scalable, and easy to maintain, with a strong focus on real-world architecture and features.

✅ What’s Built and Working
👤 User Side
Authentication is fully implemented using secure HTTP-only cookies (no token in localStorage).

Users can sign up, log in, and access protected routes safely.

A full user profile system is in place — users can update their info and save their address.

Order placement works: when a user checks out, the order is created and stored in the backend.

Users also get a personal order history page where they can see all their past orders.

Cart is persistent and handled with Zustand for quick, reactive updates.

🛒 Shopping Experience
Products are displayed by category (Men, Women, Electronics, etc.) with pagination.

Users can filter by tags, browse featured items, and see only what matters per page.

The whole UI is fully responsive and built with Tailwind CSS + shadcn/ui for a clean experience.

Fast loading with Vite, lazy loading for images, and only fetching what’s needed.

🛠 Admin Panel
A fully functional admin dashboard is included.

Built with TanStack Table + React Query for smooth, real-time updates.

Admins can:

View products in a sortable, filterable table

Create, update, and delete products with instant UI feedback

Built to be readable and usable without clutter.

🔒 Auth & State Management
JWT cookies (HTTP-only) for secure auth.

Zustand for global cart state.

Cart syncs with backend on checkout, and clears once an order is placed.

Only authenticated users can place orders or view their profile/order history.

🌐 Deployment
Frontend is deployed on Vercel

Backend runs on Render

Proper CORS handling in place to secure cross-origin requests

🧩 Tech Stack
Frontend:
React + Vite

Tailwind CSS

shadcn/ui

Zustand

Axios

React Router

TanStack Table

React Query

Backend:
Python 3.13

Flask + Flask-CORS

SQLAlchemy ORM

JWT with secure cookies

SQLite (swappable for Postgres later)

📦 Features Overview
🔐 Login/Signup with cookie-based auth

🛍 Product pages with pagination, filtering

🧺 Shopping cart with persistent state

🧾 Checkout flow with order creation

👤 User profile + order history

🛠 Admin dashboard for product management

📦 Orders stored and tied to user accounts

🚧 Work In Progress
Admin-side order fulfillment system (e.g. marking orders as shipped/delivered)

Possibly adding email notifications, payment integration, and advanced analytics later

TL;DR
This is a full-featured ecommerce platform with working login, cart, checkout, user profiles, order history, and a live admin panel. It's built to be extendable and ready for production with just a few finishing touches like order fulfillment. Everything is structured cleanly with a proper frontend-backend separation and deployment-ready setup.

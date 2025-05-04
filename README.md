# UniSell - Campus-Exclusive E-Commerce Platform

UniSell is a campus-specific online marketplace designed for LUMS students to securely buy and sell items. The platform overcomes the inefficiencies of Facebook groups and WhatsApp channels by providing structured product discovery, secure authentication, direct messaging, and admin moderation.

## Project Overview
UniSell is a web-based platform developed using React.js (Frontend) and FastAPI/Node.js (Backend). It allows LUMS students to:
- Buy and sell products securely.
- Browse product listings with filtering options.
- Communicate directly with buyers and sellers.
- Benefit from admin moderation to ensure the integrity of listings.

## Features
### 1. **User Authentication**
- LUMS students can register using university email verification.
- Secure login using JWT (JSON Web Token).
- Role-based access for buyers, sellers, and admins.

### 2. **Product Listings**
- Sellers can create and manage product listings (add, update, delete).
- Buyers can browse products, apply filters, and view detailed listings with images and descriptions.

### 3. **Messaging System**
- Real-time or asynchronous messaging system between buyers and sellers.
- Secure storage of conversation history.

### 4. **Admin Dashboard**
- Admins can moderate product listings, manage user accounts, and enforce platform policies.

### 5. **Database Design**
- The system uses PostgreSQL/MySQL for storing user accounts, product listings, messages, and reviews.
- Encrypted passwords and user authentication details.
- Indexed searching for fast product filtering.

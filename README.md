# 🔧 HardwareMarket

A modern e-commerce single-page application built with **Angular** for browsing and purchasing hardware products.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## 📖 Overview

HardwareMarket is an Angular-based e-commerce web application that allows users to browse hardware products, manage a shopping cart, and provides an admin dashboard for product management.

---

## ✨ Features

- 🏠 **Home Page** – Landing page with product highlights and a slider
- 🔍 **Product Search** – Search for products by name or category
- 🛒 **Shopping Cart** – Add, remove, and manage cart items
- 📦 **Product Details** – Detailed view for each product
- 🧩 **Master Products** – Full product listing with filtering
- 📝 **Product Form** – Add or edit products (admin)
- 📊 **Dashboard** – Admin panel for managing the store
- 🔐 **Authentication** – Login system with route guards
- 🌗 **Theme Toggle** – Light/Dark mode support
- 📱 **Responsive Design** – Mobile-friendly layout

---

## 🛠 Tech Stack

| Technology          | Version  |
| ------------------- | -------- |
| Angular             | 21.1.5   |
| TypeScript          | Latest   |
| RxJS                | Latest   |
| Angular Router      | Built-in |
| Angular Forms       | Built-in |
| Angular HTTP Client | Built-in |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── cart/             # Shopping cart component
│   │   ├── dashboard/        # Admin dashboard
│   │   ├── home/             # Home/landing page
│   │   ├── login/            # Authentication page
│   │   ├── master-products/  # Products listing page
│   │   ├── navbar/           # Navigation bar
│   │   ├── product-card/     # Reusable product card
│   │   ├── product-detail/   # Single product view
│   │   ├── product-form/     # Add/Edit product form
│   │   ├── search/           # Search component
│   │   └── slider/           # Image/product slider
│   ├── directives/
│   │   └── card-hover.directive.ts   # Hover effect directive
│   ├── guards/
│   │   └── admin.guard.ts            # Route protection for admin
│   ├── models/
│   │   ├── category.ts               # Category model
│   │   ├── product.ts                # Product model
│   │   └── user.ts                   # User model
│   ├── pipes/
│   │   └── shorten.pipe.ts           # Text shortening pipe
│   ├── services/
│   │   ├── auth.service.ts           # Authentication logic
│   │   ├── cart.service.ts           # Cart state management
│   │   ├── product.service.ts        # Product data management
│   │   └── theme.service.ts          # Theme toggle service
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── public/
│   └── imgs/                         # Static images
├── styles.css
└── index.html
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Angular CLI](https://angular.io/cli)

```bash
npm install -g @angular/cli
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/HardwareMarket.git
cd HardwareMarket
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
ng serve
```

4. **Open your browser** and navigate to:

```
http://localhost:4200
```

---

## 📜 Available Scripts

| Command                               | Description                      |
| ------------------------------------- | -------------------------------- |
| `ng serve`                            | Start the development server     |
| `ng build`                            | Build the project for production |
| `ng test`                             | Run unit tests via Karma         |
| `ng lint`                             | Lint the project source files    |
| `ng build --configuration production` | Optimized production build       |

---

## 🔐 Authentication & Guards

The application uses an **Admin Guard** (`admin.guard.ts`) to protect sensitive routes such as the Dashboard and Product Form. Users must be authenticated and have admin privileges to access these pages.

---

## 🎨 Theming

The app supports **Light/Dark mode** via the [`ThemeService`](src/app/services/theme.service.ts). The theme preference is managed globally and applied across all components.

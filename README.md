# FoodieFinds - Recipe Sharing App

This is a full-stack React application built with Manifest as the backend. It allows users to discover, create, and share recipes.

## Features

- **User Authentication**: Sign up and log in to manage your recipes.
- **Recipe CRUD**: Create, read, update, and delete your own recipes.
- **Public Recipe Feed**: Browse all recipes submitted by the community.
- **Image Uploads**: Add a photo to your recipe.
- **Recipe Reviews**: Users can rate and comment on recipes.
- **Automatic Admin Panel**: Full administrative control over users, recipes, and reviews via the Manifest admin panel.

## Backend (Manifest)

The backend is defined in `manifest.yml` and includes three main entities:

- **User**: An authenticable entity for managing user accounts.
- **Recipe**: The core entity for recipe details, with an image property and a relationship to its author (User).
- **Review**: Allows users to rate and comment on recipes, linked to both User and Recipe.

Policies are configured to ensure data privacy and ownership. For example, users can only edit or delete their own recipes.

## Frontend (React)

The frontend is a single-page application built with React and Vite, styled with Tailwind CSS.

- It uses the `@mnfst/sdk` for all communication with the Manifest backend.
- No custom authentication context or API services are needed; the SDK handles it all.
- The app consists of two main screens: a landing page for new visitors and a dashboard for logged-in users.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root and configure your Manifest backend URL:
   ```
   VITE_BACKEND_URL=https://your-manifest-backend-url.com
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Admin Access

- **URL**: `https://your-manifest-backend-url.com/admin`
- **Default Login**: `admin@manifest.build` / `admin`

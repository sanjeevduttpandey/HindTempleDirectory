# Sanatan New Zealand Platform

This project aims to create a comprehensive digital platform for the Sanatan community in New Zealand. It will serve as a central hub for devotees, temples, events, and businesses, fostering community engagement and spiritual growth.

## Features (Planned & In Progress)

*   **Devotee Profiles:** User registration, personal profiles, spiritual interests, activity tracking.
*   **Temple Directory:** Comprehensive listings of Sanatan temples across New Zealand, including details, services, facilities, and reviews.
*   **Event Management:** Listing of upcoming festivals, pujas, satsangs, and cultural events. User submission and admin approval workflow for events.
*   **Business Directory:** A marketplace for Sanatan-owned or related businesses, with a submission and approval process.
*   **Community Discussions:** Forums or groups for spiritual discussions and community interaction.
*   **Panchang/Hindu Calendar:** Daily astrological information, auspicious timings, and festival dates.
*   **Donation System:** Facilitate online donations to temples and events.
*   **Admin Dashboard:** Tools for managing users, temples, events, businesses, and content.
*   **Authentication:** Secure login/registration for devotees and admin users.

## Technologies Used

*   **Next.js:** React framework for building the web application (App Router).
*   **TypeScript:** For type safety and improved developer experience.
*   **Tailwind CSS:** For rapid UI development and styling.
*   **shadcn/ui:** Reusable UI components built with Radix UI and Tailwind CSS.
*   **Neon (PostgreSQL):** Serverless PostgreSQL database for data storage.
*   **Vercel Blob:** For image and file storage.
*   **Supabase:** (Potentially for Auth, but currently using custom session management for admin)

## Getting Started

1.  **Clone the repository:**
    `git clone [repository-url]`
    `cd sanatan-new-zealand`

2.  **Install dependencies:**
    `npm install`
    or
    `yarn install`
    or
    `pnpm install`

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your database connection string and other necessary variables:

    \`\`\`
    DATABASE_URL="YOUR_NEON_POSTGRES_URL"
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    ADMIN_PASSWORD="YOUR_ADMIN_PASSWORD" # For admin login
    BLOB_READ_WRITE_TOKEN="YOUR_VERCEL_BLOB_TOKEN" # For image uploads
    \`\`\`

4.  **Run Database Migrations (if applicable):**
    If you have SQL scripts for database setup (e.g., in `scripts/`), you'll need to run them against your Neon database. You can use a tool like `psql` or a database GUI.

    \`\`\`bash
    # Example:
    # psql -h <host> -p <port> -U <user> -d <database> -f scripts/01-create-database.sql
    # psql -h <host> -p <port> -U <user> -d <database> -f scripts/02-seed-sample-data.sql
    \`\`\`
    *Note: For `Next.js` environment, these scripts are executed automatically by v0.*

5.  **Run the development server:**
    `npm run dev`
    or
    `yarn dev`
    or
    `pnpm dev`

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

*   `app/`: Next.js App Router pages, layouts, and API routes.
*   `components/`: Reusable React components (including shadcn/ui overrides and custom components).
*   `lib/`: Utility functions, database interactions, authentication logic.
*   `public/`: Static assets like images.
*   `scripts/`: SQL scripts for database schema and seeding.
*   `styles/`: Global CSS.

## Deployment

This project is designed to be deployed on [Vercel](https://vercel.com). Ensure your environment variables are configured on Vercel.

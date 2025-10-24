# AIBOS Take-Home Assignment – Tech Stack Documentation

## 📌 Project Overview
This repository contains an implementation of the **AIBOS Take-Home Assignment**.  
**Challenge 3: Simple Note-Sharing Application**, which allows users to create, list, and delete personal notes after authentication.  

The focus of this project is to demonstrate:
- Practical development skills
- Problem-solving ability
- Clean, maintainable code
- Thoughtful use of modern technologies

---

## ⚙️ Tech Stack

### Frontend
- **React.js (Vite + TypeScript)**  
  Chosen for its component-driven architecture, strong ecosystem, and developer productivity.  
  - **React Router** for client-side navigation  
  - **TailwindCSS** for rapid, responsive UI development  

### Backend
- **Node.js (Express.js)**  
  Provides a lightweight, flexible API layer.  
  - RESTful endpoints for authentication and note management  
  - Middleware for validation and error handling  

### Database
- **Firebase Firestore**  
  Selected for simplicity, scalability, and real-time sync capabilities.  
  - Stores user accounts and associated notes  
  - Handles authentication securely with Firebase Auth  

---

## 🚀 Features Implemented
- **User Authentication** (Supabase Auth – email/password)  
- **Create, List, and Delete Notes** (linked to authenticated user)  
- **Persistent Storage** (Postgres database)  
- **Responsive UI** (mobile-first design with TailwindCSS v4)  

### Optional Enhancements
- Markdown input support for notes  
- Search functionality to filter notes  
- API endpoints structured for multi-user support  

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (>= 18.x)
- npm or yarn (preferrably pnpm or bun)
- Supabase project credentials

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/timwm/aibos-notex.git
   cd aibos-notex
   ```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

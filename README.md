# Pillardash - Next.js 16 Advanced Boilerplate

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0+-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/Redux-4.2.0+-764ABC?logo=redux)](https://redux-toolkit.js.org/)

A production-ready Next.js 16 foundation with cutting-edge tools and optimized configurations for enterprise-grade applications.

## ✨ Features

### 🚀 Core Stack

- **Next.js 16** with App Router
- **TypeScript** out of the box
- **Tailwind CSS** v3.4+ with CSS variables
- **ESLint** + **Prettier** pre-configured
- **Husky** with commit linting

### 🔥 New Additions

- **SEO Optimization**
    - Automatic sitemap generation (`/app/sitemap.ts`)
    - Dynamic robots.txt configuration (`/app/robots.ts`)
    - Next.js Metadata API integration

- **State Management**
    - **Redux Toolkit** with TypeScript support
    - **Redux Persist** for state hydration
    - Pre-configured `authSlice` with JWT flow

- **API Layer**
    - Advanced **Axios** configuration
    - Request/response interceptors
    - Type-safe API clients

- **UI Components**
    - Custom `<Alert>` system with toast notifications
    - Enhanced `<Button>` with loading states
    - Responsive design utilities

## 🛠️ Quick Start

1. **Clone the repository and install dependencies:**

```bash
  git clone git@github.com:mrprotocoll/pillardash-nextjs-15-boilerplate.git
  cd project

  npm install
```

2. **Update `/lib/constants.ts`:**

- Update CONSTANTS to suit your project

## Usage

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Lint the code:

```sh
npm run lint
```

## Contributing

Feel free to fork this repository and submit pull requests.

## License

MIT License

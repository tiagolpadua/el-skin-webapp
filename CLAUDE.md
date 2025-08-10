# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Next.js development server (on localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server after build
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint source files
- `npm run lint:fix` - Lint and auto-fix source files

## Architecture Overview

This is a Next.js TypeScript e-commerce application for skincare products with the following key architectural patterns:

### State Management
- **Redux Toolkit**: Uses RTK Query for API calls and Redux for global state management
  - Cart state management via Redux slice
  - Search state management via Redux slice
- **Custom Hooks**: Business logic encapsulated in hooks (e.g., `useCart`, `useSearch`)

### Styling Architecture
- **Styled Components**: Primary styling solution with TypeScript theme support and Next.js SSR
- **Theme System**: Comprehensive design system in `src/styles/theme.ts` with:
  - Color palette (primary purple theme: #8B4A8B)
  - Spacing, typography, shadows, and breakpoints
  - Component-specific colors (cart, tags, etc.)
- **Global Styles**: Normalized CSS and global styles via `GlobalStyles.tsx`

### API Architecture
- **Next.js API Routes**: Built-in API endpoints in `app/api/` directory
  - `/api/products` - Product data endpoints
  - `/api/carousel` - Carousel data endpoints
- **RTK Query**: Data fetching and caching with Redux Toolkit Query
- **Configuration**: Centralized API config in `src/config/APIConfig.ts`

### Component Structure
- **App Router**: Next.js 13+ app directory structure
- **Page Components**: Route-level components in `app/` directory
- **Shared Components**: Reusable UI components in `src/components/`
- **Layout Components**: Header, Footer integrated into root layout

### Routing
- **Next.js App Router**: File-based routing with `app/` directory
- **Pages**: Home (`app/page.tsx`), About (`app/about/page.tsx`), NotFound (`app/not-found.tsx`)

### Testing
- **Jest + React Testing Library**: Unit and integration tests
- **Test Location**: Tests co-located with components (`.test.tsx` files)
- **Coverage**: Coverage reports generated in `/coverage/` directory

## Key Technologies

- Next.js 15 with TypeScript
- React 19
- Redux Toolkit with RTK Query for state management
- Styled Components for styling with SSR support
- FontAwesome for icons
- Jest + React Testing Library for testing

## Project Structure Notes

- `app/` - Next.js app directory with pages and API routes
- `src/hooks/` - Custom React hooks
- `src/store/` - Redux store configuration and slices
- `src/styles/` - Theme configuration and global styles
- `src/config/` - Application configuration
- `/public/` - Static assets including product images

## Development Notes

- The app uses Next.js built-in API routes at `/api/*`
- ESLint configured with React and TypeScript rules
- Strict TypeScript configuration enabled
- Product images are served from `/public/` directory
- Styled Components configured for SSR with Next.js
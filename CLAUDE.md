# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server (React app on localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run tests in watch mode
- `npm run lint` - Lint source files
- `npm run lint:fix` - Lint and auto-fix source files

## Architecture Overview

This is a React TypeScript e-commerce application for skincare products with the following key architectural patterns:

### State Management
- **Context API**: Uses React Context for global state management
  - `CartContext` - Shopping cart state and operations
  - `SearchContext` - Product search functionality
- **Custom Hooks**: Business logic encapsulated in hooks (e.g., `useCart`)

### Styling Architecture
- **Styled Components**: Primary styling solution with TypeScript theme support
- **Theme System**: Comprehensive design system in `src/styles/theme.ts` with:
  - Color palette (primary purple theme: #8B4A8B)
  - Spacing, typography, shadows, and breakpoints
  - Component-specific colors (cart, tags, etc.)
- **Global Styles**: Normalized CSS and global styles via `GlobalStyles.tsx`

### API Architecture
- **Service Layer**: API calls abstracted through service modules
  - `productService.ts` - Product data operations
  - `carouselService.ts` - Carousel data operations
- **Configuration**: Centralized API config in `src/config/APIConfig.ts`
- **Mock Data**: Uses `db.json` for development API data

### Component Structure
- **Atomic Design**: Components organized by functionality
- **Page Components**: Route-level components in `src/pages/`
- **Shared Components**: Reusable UI components in `src/components/`
- **Layout Components**: Header, Footer for consistent page structure

### Routing
- **React Router**: Client-side routing with routes defined in `src/routes.tsx`
- **Pages**: Home, About, NotFound with nested component structure

### Testing
- **Jest + React Testing Library**: Unit and integration tests
- **Test Location**: Tests co-located with components (`.test.tsx` files)
- **Coverage**: Coverage reports generated in `/coverage/` directory

## Key Technologies

- React 19 with TypeScript
- Styled Components for styling
- React Router for navigation
- Axios for API calls
- FontAwesome for icons
- Jest + React Testing Library for testing

## Project Structure Notes

- `src/context/` - React Context providers for global state
- `src/hooks/` - Custom React hooks
- `src/service/` - API service layer
- `src/styles/` - Theme configuration and global styles
- `src/config/` - Application configuration
- `/public/` - Static assets including product images
- `db.json` - Mock API data for development

## Development Notes

- The app expects a JSON server running on `localhost:3001` or configured via `REACT_APP_API_URL`
- ESLint configured with React and TypeScript rules
- Strict TypeScript configuration enabled
- Product images are served from `/public/` directory
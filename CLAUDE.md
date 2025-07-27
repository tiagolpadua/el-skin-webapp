# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application

- `npm start` - Start development server (opens http://localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run tests with coverage
- `npm run lint` - Run ESLint on src directory
- `npm run lint:fix` - Fix ESLint issues automatically

### Backend Data Server

- `./db.sh` - Start JSON server on port 3001 serving db.json
- Data server runs at http://localhost:3001 with endpoints:
  - `/products` - Product catalog
  - `/carousel` - Homepage carousel data

## Architecture Overview

### Core Stack

- **React 19** with TypeScript
- **React Router** for navigation (BrowserRouter)
- **Axios** for API communication
- **FontAwesome** for icons
- **Create React App** foundation

### Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── Carousel/       # Homepage image carousel
│   ├── CartModal/      # Shopping cart modal
│   ├── Header/         # Navigation with search and cart
│   ├── Footer/         # Site footer
│   ├── ProductCard/    # Individual product display
│   └── ProductGrid/    # Product listing container
├── context/            # React Context providers
│   ├── CartContext/    # Shopping cart state management
│   └── SearchContext/ # Search functionality state
├── hooks/              # Custom React hooks
│   └── useCart.ts     # Cart operations and state
├── pages/              # Route components
│   ├── Home/          # Homepage with carousel and products
│   ├── About/         # About page
│   └── NotFound/      # 404 page
├── services/           # API communication layer
│   ├── api.ts         # Axios instance configuration
│   ├── productService.ts # Product data operations
│   └── carouselService.ts # Carousel data operations
└── config/
    └── api.ts         # API configuration and endpoints
```

### State Management Pattern

- **Context + Hooks**: Uses React Context for global state (cart, search)
- **Custom Hooks**: Business logic encapsulated in `useCart` hook
- **Provider Pattern**: App wrapped in `SearchProvider` → `CartProvider` → `Router`

### API Integration

- **Base URL**: Configured via `REACT_APP_API_URL` environment variable (defaults to localhost:3001)
- **Product Interface**: Standardized `IProduct` type with id, name, description, price, image, tags
- **Error Handling**: Services include try/catch with console error logging
- **Timeout**: 10-second timeout configured for all API calls

### Component Patterns

- **Functional Components**: All components use React function syntax
- **TypeScript**: Strict typing with interfaces for props and data structures
- **CSS Modules**: Some components use `.module.css` for scoped styles
- **Test Co-location**: Test files alongside components (`.test.tsx`)

### Key Business Logic

- **Shopping Cart**: Add/remove items, quantity management, total calculation
- **Product Search**: Real-time filtering via search context
- **Responsive Design**: Mobile-first approach with CSS media queries

### Testing Strategy

- **Jest + React Testing Library**: 66 tests across 10 files
- **Coverage**: ~49% statement coverage (see TESTE_REPORT.md for details)
- **Test Types**: Unit tests for hooks, components, and services
- **Mock Strategy**: Axios mocked for service tests

### Development Notes

- **Port Configuration**: Frontend (3000), Backend JSON server (3001)
- **Asset Management**: Images stored in `public/assets/`
- **TypeScript Paths**: `@/*` alias configured for `src/*` imports
- **ESLint**: React app configuration with TypeScript support

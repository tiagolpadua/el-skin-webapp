// Configurações da API
export const API_CONFIG = {
  // BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  BASE_URL: 'http://localhost:3001',
  TIMEOUT: parseInt(process.env.API_TIMEOUT || '') || 10000,
  
  // Endpoints
  ENDPOINTS: {
    CAROUSEL: '/carousel',
    PRODUCTS: '/products',
  },
  
  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

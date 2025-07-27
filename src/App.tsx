import React from 'react';
import './App.css';
import AppRouter from './routes';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;

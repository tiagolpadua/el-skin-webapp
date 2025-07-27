import React from 'react';
import AppRouter from './routes';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SearchProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import AppRouter from './routes';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from 'styled-components';
import { themeV2 } from './styles/theme-v2';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={themeV2}>
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

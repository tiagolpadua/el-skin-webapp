import React from 'react';
import './App.css';
import AppRouter from './routes';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </SearchProvider>
  );
}

export default App;

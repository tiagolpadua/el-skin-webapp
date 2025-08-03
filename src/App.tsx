import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { CartProvider } from './context/CartContext';
import { store } from './store';
import AppRouter from './routes';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import React from 'react';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;

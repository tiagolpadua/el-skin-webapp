import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
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
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;

'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import StyledComponentsRegistry from './lib/registry';
import { store } from '../store';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

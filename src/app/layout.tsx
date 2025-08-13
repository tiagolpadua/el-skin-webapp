"use client";

import { Provider } from "react-redux"
import { store } from "../store"
import { theme } from "../styles/theme"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "../styles/GlobalStyles"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return <html lang="en">
      <head>
        <title>AL SKIN</title>
        <meta name="description" content="Sobre a AL SKIN" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Header />
              <div id="root">{children}</div>
            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
}

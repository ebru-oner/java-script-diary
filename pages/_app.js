// pages/_app.js
import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h4: {
      fontFamily: "Courgette, cursive",
      fontSize: "1.8rem",
    },
    body1: {
      fontFamily: "Caveat, cursive",
      fontSize: "1.2rem",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

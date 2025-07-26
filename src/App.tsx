import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { amscTheme } from './theme/muiTheme';
import { AMSCApp } from './components/AMSCApp';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={amscTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AMSCApp />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

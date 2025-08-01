import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { amscTheme } from './theme/muiTheme';
import { AMSCApp } from './components/AMSCApp';
import { store } from './store';

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={amscTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AMSCApp />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;

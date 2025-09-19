import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App.tsx';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './shared/styles/theme';
import '@/shared/styles/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <App />
          <ToastContainer position="bottom-center" hideProgressBar={true} />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './shared/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import '@/shared/styles/global.css';
import App from '@/app/App.tsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer position="bottom-center" hideProgressBar={true} />
      </QueryClientProvider>
    </ChakraProvider>
  </BrowserRouter>,
);

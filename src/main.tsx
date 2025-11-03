import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './shared/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import * as Sentry from '@sentry/react';

import '@/shared/styles/global.css';
import App from '@/app/App.tsx';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        <ToastContainer position="bottom-center" hideProgressBar={true} />
      </QueryClientProvider>
    </ChakraProvider>
  </BrowserRouter>,
);

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
import { APP_BASE_PATH } from '@/shared/config/runtimePaths';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({ dsn: sentryDsn });
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={APP_BASE_PATH || '/'}>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        <ToastContainer position="top-right" hideProgressBar={true} closeOnClick={true} limit={1} />
      </QueryClientProvider>
    </ChakraProvider>
  </BrowserRouter>,
);

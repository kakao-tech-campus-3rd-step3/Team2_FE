import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './shared/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import '@/shared/styles/global.css';
import App from '@/app/App.tsx';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallback={
            <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
              <h2>앗! 예상치 못한 오류가 발생했습니다 😢</h2>
              <p>잠시 후 다시 시도해주세요.</p>
            </div>
          }
        >
          <App />
        </ErrorBoundary>
        <ToastContainer position="bottom-center" hideProgressBar={true} />
      </QueryClientProvider>
    </ChakraProvider>
  </BrowserRouter>,
);

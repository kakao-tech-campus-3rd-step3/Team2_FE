import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App.tsx';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './shared/styles/theme';
import '@/shared/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);

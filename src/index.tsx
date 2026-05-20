import 'react-toastify/dist/ReactToastify.css';

import '@/shared/styles/foundations/index.css';
import '@/shared/styles/global.css';
import '@/shared/styles/theme.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

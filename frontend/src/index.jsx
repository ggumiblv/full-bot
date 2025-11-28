import profileStore from './api/profile/index.js';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import './index.css';

async function render() {
  const { default: App } = await import('./App.jsx');
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

profileStore.auth().finally(() => render());

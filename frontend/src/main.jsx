import ProfileStore from './api/profile/index.js';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { apiUrl } from './helpers.js';
import { StrictMode } from 'react';

import './index.css';

const initData = window.Telegram?.WebApp.initData;

async function preloadUser() {
  try {
    const response = await fetch(`${apiUrl}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData })
    });

    const data = await response.json();
    ProfileStore(data.user);

    if (data.success) {
      alert(`Добро пожаловать, ${data.user.first_name}!`);
    } else {
      alert('Ошибка авторизации.');
    }
  } catch (err) {
    console.error('Auth error:', err);
  }
}

//вынести useAuth сюда
//посмотреть в талане новосиб prefech данных в index.js
//сохранить пользователя в стор

async function render() {
  const { default: App } = await import('./App');
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

preloadUser().finally(() => render());

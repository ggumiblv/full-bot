import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Catalog from './pages/catalog';
import Home from './pages/home';
import Form from './pages/form';

import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="form" element={<Form />} />
        <Route path="catalog" element={<Catalog />} />
      </Routes>
    </div>
  );
}

export default App;

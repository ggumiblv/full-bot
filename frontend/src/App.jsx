import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import ProductList from './components/product-list';
import Home from './components/home';
import Form from './components/form';

import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="form" element={<Form />}></Route>
        <Route path="catalog" element={<ProductList />}></Route>
      </Routes>
    </div>
  );
}

export default App;

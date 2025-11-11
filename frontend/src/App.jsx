import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import profileStore from './api/profile';
import { useEffect } from 'react';

import ProductList from './components/product-list';
import Form from './components/form';

import './App.css';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="app">
      {profileStore.user ? <p>Authenticated</p> : <p>Not Authenticated</p>}
      <Routes>
        <Route index element={<ProductList />}></Route>
        <Route path="form" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;

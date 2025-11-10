import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

import ProductList from './components/product-list';
import Form from './components/form';

import './App.css';

function App() {
  const { isAuth, signIn } = useAuth();
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    signIn(window.Telegram?.WebApp.initData);
  }, []);

  return (
    <div className="app">
      {isAuth ? <p>Authenticated</p> : <p>Not Authenticated</p>}
      <Routes>
        <Route index element={<ProductList />}></Route>
        <Route path="form" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;

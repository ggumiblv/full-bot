import profileStore from '../../api/profile';
import { Link } from 'react-router-dom';

import './index.css';

const Home = () => {
  return (
    <div className="home">
      {profileStore.user ? (
        <p className="home-greeting">{'Привет, ' + profileStore.user.first_name}</p>
      ) : (
        <p className="home-greeting">Вы не авторизованы</p>
      )}
      <h1 className="home-title">
        Добро пожаловать <br /> в наш магазин!
      </h1>

      <img className="home-image" alt="shop" src="/shop-icon.webp" />

      <Link className="home-link" to="/catalog">
        Открыть каталог
      </Link>
    </div>
  );
};

export default Home;

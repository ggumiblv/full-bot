import profileStore from './api/profile';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {profileStore.user ? (
        <p>{'Привет, ' + profileStore.user.first_name}</p>
      ) : (
        <p>Not Authenticated</p>
      )}
      <h1>Добро пожаловать в наш магазин!</h1>

      <Link to="/catalog">Посмотреть ассортимент</Link>
    </div>
  );
};

export default Home;

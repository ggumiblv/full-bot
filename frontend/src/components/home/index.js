import profileStore from './api/profile';

const Home = () => {
  return (
    <div>
      {profileStore.user ? (
        <p>{'Привет, ' + profileStore.user.first_name}</p>
      ) : (
        <p>Not Authenticated</p>
      )}
      <h1>Добро пожаловать в наш магазин!</h1>
    </div>
  );
};

export default Home;

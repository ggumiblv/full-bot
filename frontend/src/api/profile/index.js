import { action, computed, makeObservable, observable } from 'mobx';
import { apiUrl } from '../../config';

class ProfileStore {
  user = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      isAuth: computed,
      setUser: action,
      auth: action
    });
  }

  get isAuth() {
    return !!this.user;
  }

  setUser(user) {
    this.user = user;
    return this.user;
  }

  async auth() {
    const initData = window.Telegram?.WebApp.initData;

    try {
      const response = await fetch(`${apiUrl}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData })
      });

      if (!response.ok) {
        this.setUser(null);
        return console.error('Ошибка запроса');
      }

      const data = await response.json();
      this.setUser(data.user);
    } catch (err) {
      console.error('Auth error:', err);
    }
  }
}

export default new ProfileStore();

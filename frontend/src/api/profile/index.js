import { makeAutoObservable } from 'mobx';

class ProfileStore {
  user = {};

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }
}

export default new ProfileStore();

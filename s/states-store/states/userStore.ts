import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';

export class UserStore {
  @observable userLogged:boolean = false;
  userUID:string = '';
  @observable dbDataLoading: boolean = true;

  constructor() {
    makeObservable(this);
  }

  @action
  NotLogged() {
    this.userLogged = false;
  }

  @action
  Logged() {
    this.userLogged = true;
  }

  @action
  setUserUID(uid: any) {
    this.userUID = uid;
  }

  @action
  isDbDataLoading(boolean: boolean) {
    if (boolean) {
      this.dbDataLoading = true;
    } else {
      this.dbDataLoading = false;
    }
  }

}

export default createContext(new UserStore());

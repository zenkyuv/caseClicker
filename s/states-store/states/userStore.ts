import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';

export class UserStore {
  @observable userIsLogged:boolean = false;
  userUID:string = '';
	@observable dbDataLoading: boolean = true;
	@observable money: number = 0
	@observable username: string = ''

  constructor() {
    makeObservable(this);
	}

	@action
	setUserMoney(money: number) {
		this.money = money
	}

  @action
  logoutUser() {
    this.userIsLogged = false;
  }

  @action
  loginUser() {
    this.userIsLogged = true;
  }

  @action
  setUserUID(uid: any) {
    this.userUID = uid;
  }

	@action
	setUsername(username: string) {
		this.username = username
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

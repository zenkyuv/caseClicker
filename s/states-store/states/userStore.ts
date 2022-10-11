import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';

export class UserStore {
  @observable userIsLogged:boolean = false;
  userUID:string = '';
	@observable dbDataLoading: boolean = true;
	@observable money: number = 0

  constructor() {
    makeObservable(this);
	}

	@action
	setUserMoney(money: number) {
		console.log(money)
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
  isDbDataLoading(boolean: boolean) {
    if (boolean) {
      this.dbDataLoading = true;
    } else {
      this.dbDataLoading = false;
    }
  }

}

export default createContext(new UserStore());

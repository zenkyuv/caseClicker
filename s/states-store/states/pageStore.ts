import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';

export class PageStore {
	@observable inventoryVisible = false;
	@observable clickerVisible = false

  constructor() {
    makeObservable(this);
  }

  @action setInventoryVisible = (bool: boolean) => {
    this.inventoryVisible = bool;
	};
	
	@action setClickerVisible = (bool: boolean) => {
    this.clickerVisible = bool;
  };
}
const pageStore = new PageStore();

export default createContext(pageStore);

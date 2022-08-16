import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';

export class PageStore {
  @observable inventoryVisible = false;

  constructor() {
    makeObservable(this);
  }

  @action setInventoryVisible = (bool: boolean) => {
    this.inventoryVisible = bool;
  };
}
const pageStore = new PageStore();

export default createContext(pageStore);

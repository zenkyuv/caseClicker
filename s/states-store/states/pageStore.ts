import { action, makeObservable } from 'mobx';
import { observable } from 'mobx';
import { createContext } from 'react';

export class PageStore {
	@observable inventoryVisible = false;
	@observable clickerVisible = false
	@observable chestShopVisible = false
	@observable coinFlipVisible = false
	@observable tradePanelVisible = false

  constructor() {
    makeObservable(this);
  }

	@action clearState = () => {
		this.clickerVisible = false
		this.inventoryVisible = false
		this.chestShopVisible = false
		this.coinFlipVisible = false
		this.tradePanelVisible = false
	}

	@action setInventoryVisible = (bool: boolean) => {
		this.clearState()
    this.inventoryVisible = bool;
	};
	
	@action setClickerVisible = (bool: boolean) => {
		this.clearState()
    this.clickerVisible = bool;
	};
	
	@action setChestShopVisible = (bool: boolean) => {
		this.clearState()
		this.chestShopVisible = bool
	}

	@action setCoinFlipVisible = (bool: boolean) => {
		this.clearState()
		this.coinFlipVisible = bool
	}

	@action setTradePanelVisible = (bool: boolean) => {
		this.clearState()
		this.tradePanelVisible = bool
	}
}
const pageStore = new PageStore();

export default createContext(pageStore);

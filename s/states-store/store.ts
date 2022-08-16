import React from "react";
import { PageStore } from "./states/pageStore";
import { UserStore } from "./states/userStore";

export const stores = Object.freeze({
	pageStore: new PageStore(),
	userStore: new UserStore()
})

export const storesContext = React.createContext(stores)
export const StoresProvider = storesContext.Provider
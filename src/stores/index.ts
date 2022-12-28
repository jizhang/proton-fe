import { createContext } from 'react'
import RootStore from './root'

export const rootStore = new RootStore()
export const RootStoreContext = createContext(rootStore)

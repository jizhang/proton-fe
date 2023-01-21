import React from 'react'
import { createRoot } from 'react-dom/client'
import { rootStore, RootStoreContext } from './stores'
import App from './App'
import './index.css'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)
root.render(
  <RootStoreContext.Provider value={rootStore}>
    <App />
  </RootStoreContext.Provider>
)

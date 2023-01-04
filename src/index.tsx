import React from 'react'
import { createRoot } from 'react-dom/client'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { rootStore, RootStoreContext } from './stores'
import App from './App'
import './index.css'

library.add(fas)

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)
root.render(
  <RootStoreContext.Provider value={rootStore}>
    <App />
  </RootStoreContext.Provider>
)

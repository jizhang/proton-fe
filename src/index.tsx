import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { rootStore, RootStoreContext } from './stores'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)
root.render(
  <RootStoreContext.Provider value={rootStore}>
    <App />
  </RootStoreContext.Provider>
)

registerServiceWorker()

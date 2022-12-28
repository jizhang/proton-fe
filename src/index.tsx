import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { rootStore, RootStoreContext } from './stores'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

ReactDOM.render(
  <RootStoreContext.Provider value={rootStore}>
    <App />
  </RootStoreContext.Provider>,
  document.getElementById('app') as HTMLElement
)

registerServiceWorker()

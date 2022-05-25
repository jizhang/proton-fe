import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import App from './App'
import RootStore from './stores/root'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

configure({ enforceActions: true })
const rootStore = new RootStore()

ReactDOM.render(
  <Provider {...rootStore}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLElement
)

registerServiceWorker()

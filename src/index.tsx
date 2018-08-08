import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()

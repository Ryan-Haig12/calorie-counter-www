import './index.css'
import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const jsx = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render(jsx, document.getElementById('root'))

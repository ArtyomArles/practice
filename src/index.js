import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'
// import {
//   // persistor, 
//   store
// } from './store/index'
import {Provider} from 'react-redux'
import store, {persistor} from './store'

// console.log = console.warn = console.error = () => { }
// console.error('Something bad happened.')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>)

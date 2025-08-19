import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import React from 'react'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

const persistor=persistStore(store)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>

  <App/>

  </PersistGate>
  </Provider>
  <Toaster/>

  </React.StrictMode>
  ,
)

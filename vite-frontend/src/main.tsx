import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store'; // Update the path as needed
import { PersistGate } from 'redux-persist/integration/react';
import { persistor} from './store/store';


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
</React.StrictMode>
)

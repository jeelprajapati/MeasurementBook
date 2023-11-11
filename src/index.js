import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
const validTypes = ['info', 'success', 'error'];
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  type: 'info',
  offset: '30px',
  transition: transitions.SCALE
}
if (validTypes.includes(options.type)) {
  
} else {
  options.type = 'info';
  
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
  </Provider>
);

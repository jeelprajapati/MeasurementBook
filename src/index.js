import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const validTypes = ['info', 'success', 'error'];
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  type: 'info',
  offset: '30px',
  transition: transitions.SCALE
}
if (validTypes.includes(options.type)) {
  console.log('Valid type:', options.type);
} else {
  options.type = 'info';
  console.log('Invalid type, set to default:', options.type);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);

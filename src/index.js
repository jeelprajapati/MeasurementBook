import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PropTypes from 'prop-types';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
// import {
//   QueryClient,
//   QueryClientProvider
// } from '@tanstack/react-query'
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  type: PropTypes.oneOf(['info', 'success', 'error']),
  offset: '60px',
  transition: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <QueryClientProvider client={queryClient}> */}
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  {/* </QueryClientProvider> */}
  </React.StrictMode>
);

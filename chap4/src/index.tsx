import React from 'react';
import ReactDOM from 'react-dom/client';
import CustomerForm from './CustomerForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomerForm />
  </React.StrictMode>
);

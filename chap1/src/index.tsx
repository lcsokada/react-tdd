import React from 'react';
import ReactDOM from 'react-dom/client';
import { Appointment } from './Appointment/Appointment';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Appointment firstName='Lucas' />
  </React.StrictMode>
);

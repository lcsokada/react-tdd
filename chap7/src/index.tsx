import React from 'react';
import ReactDOM from 'react-dom/client';
import AppointmentsDaysView from './components/AppointmentsDaysView';
import AppointmentsDayViewLoader from './components/AppointmentsDayViewLoader';
import { sampleAppointments } from './sampleData';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppointmentsDayViewLoader />
  </React.StrictMode>
);

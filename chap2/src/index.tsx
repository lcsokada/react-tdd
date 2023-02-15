import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppointmentsDaysView } from './Appointment/Appointment';
import { sampleAppointments } from './sampleData';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppointmentsDaysView appointments={sampleAppointments} />
  </React.StrictMode>
);

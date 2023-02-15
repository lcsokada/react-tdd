import React from 'react';
import ReactDOM from 'react-dom/client';
import AppointmentForm from './AppointmentForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const oneDayInMs = 24 * 60 * 60 * 1000
const today = new Date()
const tomorrow = new Date(today.getTime() + oneDayInMs)

const availableTimeSlots = [
  {startsAt: today.setHours(9, 0, 0, 0)},
  {startsAt: today.setHours(9, 30, 0, 0)},
  {startsAt: tomorrow.setHours(9, 30, 0, 0)}
]

root.render(
  <React.StrictMode>
    <AppointmentForm 
      original={{service: 'teste', startsAt: today.setHours(9, 30, 0, 0)}}
      availableTimeSlots={availableTimeSlots}
      today={today}
      salonOpensAt={9}
      salonClosesAt={11}
    />
  </React.StrictMode>
);

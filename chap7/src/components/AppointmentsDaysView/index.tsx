import React, { useState } from "react"

interface Props {
  firstName: string
}

export const Appointment: React.FC<Props> = (props: Props) => {
  
  return (
    <div>
      {props.firstName}
    </div>
  )
}

interface AppointmentsDaysViewProps {
  startsAt: number
  customer?: {
    firstName: string
  }
}

const AppointmentsDaysView = ({appointments = []}: {appointments?: Array<AppointmentsDaysViewProps>}) => { 
  const [selectedAppointments, setSelectedAppointments] = useState(0)
  
  const appointmentTimeOfDay = (startsAt: number) => {
    const [h, m] = new Date(startsAt).toTimeString().split(':')
    return `${h}:${m}`
  }
  
  return (
    <div id='appointmentsDayView'>
      <ol>
        {appointments.map((appointment: AppointmentsDaysViewProps, i) => {
          return <li key={appointment.startsAt}>
            <button 
              type='button'
              onClick={() => setSelectedAppointments(i)}
            >
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        })}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today</p>
      ) : (
        <Appointment firstName={appointments[selectedAppointments].customer?.firstName ?? ''} />
      )}
    </div>
  )
} 

export default AppointmentsDaysView
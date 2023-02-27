import { useEffect, useState } from 'react'
import AppointmentsDaysView from '../AppointmentsDaysView'

const AppointmentsDayViewLoader = ({today = new Date()}: {today?: Date}) => { 
  const [appointments, setAppointments] = useState<{ startsAt: number }[]>([])
  
  useEffect(() => {
    const from = today.setHours(0, 0, 0, 0)
    const to = today.setHours(23, 59, 59, 999)
    const fetchAppointments = async() => {
      try { 
        const result = await global.fetch(`/appointments/${from}-${to}`, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        setAppointments(result as unknown as typeof appointments)
      } catch {
        setAppointments([])
      }
    }
    
    fetchAppointments()
  }, [today])
  
  return ( 
    <AppointmentsDaysView appointments={appointments} />
  )
}

export default AppointmentsDayViewLoader
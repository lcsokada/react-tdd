import { useCallback, useState } from 'react'
import TimeSlotTable from './TimeSlotTable'

type Service = {
  service: string
  startsAt?: number
}

type AvailableTime = {
  startsAt: number
}

interface Props {
  selectableServices?: string[]
  original?: Service
  salonOpensAt?: number
  salonClosesAt?: number
  today?: Date,
  availableTimeSlots?: AvailableTime[]
  onSubmit?: (original: Service) => void
}

const AppointmentForm = ({
  selectableServices = [], 
  original = {service: ''},
  salonOpensAt = 0,
  salonClosesAt = 0,
  today = new Date(),
  availableTimeSlots = [],
  onSubmit = () => {}
} : Props) => {
  
  const [appointment, setAppointment] = useState(original)
  
  const handleStartsAtChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment((appointment) => ({
      ...appointment,
      startsAt: parseInt(event.target.value)
    }))
  }, [])
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(appointment)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <select 
        name='service'
        defaultValue={original.service}
      >
        <option />
        {selectableServices.map(service => (
          <option key={service}>{service}</option>
        ))}
      </select>
      <TimeSlotTable 
        salonOpensAt={salonOpensAt} 
        salonClosesAt={salonClosesAt} 
        today={today} 
        availableTimeSlot={availableTimeSlots}
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleStartsAtChange}
      />
      <input type='submit' value='Add' />
    </form>
  )
}

export default AppointmentForm
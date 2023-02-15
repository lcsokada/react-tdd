import RadioButtonIfAvailable from '../RadioButtonIfAvailable'

type AvailableTime = {
  startsAt: number
}

interface Props {
  salonOpensAt: number,
  salonClosesAt: number,
  today: Date,
  availableTimeSlot: AvailableTime[],
  checkedTimeSlot: number | undefined,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TimeSlotTable = ({salonOpensAt, salonClosesAt, today, availableTimeSlot, checkedTimeSlot, handleChange}: Props) => {
  const timeIncrements = (numTimes: number, startTime: number, increment: number): Array<number> => {
    const allTimes = new Array<number>(numTimes)
    const incrementedTimes = allTimes.fill(startTime).map((time, i) => time + increment * i)
    return incrementedTimes
  }
  
  const dailyTimeSlots = (salonOpensAt: number, salonClosesAt: number) => {
    const totalSlots = (salonClosesAt - salonOpensAt) * 2
    const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
    const increment = 30 * 60 * 1000
    return timeIncrements(totalSlots, startTime, increment)
  }
  
  const toTimeValue = (timestamp: number) => {
    return new Date(timestamp).toTimeString().substring(0, 5)
  }
  
  const weeklyDateValues = (startDate: Date) => {
    const midnight = startDate.setHours(0, 0, 0, 0)
    const increment = 24 * 60 * 60 * 1000
    return timeIncrements(7, midnight, increment)
  }
  
  const toShortDate = (timestamp: number) => {
    const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(' ')
    return `${day} ${dayOfMonth}`
  }
  
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt)
  const dates = weeklyDateValues(today)
  
  return (
    <table id='time-slots'>
      <thead>
        <tr>
          <th />
          {dates.map(day => (
            <th key={day} id={day.toString()}>{toShortDate(day)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot: number) => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {
              dates.map(date => (
                <td key={date}>
                  {
                    <RadioButtonIfAvailable
                      availableTimeSlots={availableTimeSlot}
                      date={date}
                      timeSlot={timeSlot}
                      checkedTimeSlot={checkedTimeSlot}
                      handleChange={handleChange}
                    />
                  }
                </td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TimeSlotTable
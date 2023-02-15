import React from 'react'

type AvailableTime = {
  startsAt: number
}

interface Props {
  availableTimeSlots: AvailableTime[]
  date: number
  timeSlot: number
  checkedTimeSlot: number | undefined
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButtonIfAvailable = ({
  availableTimeSlots,
  date,
  timeSlot,
  checkedTimeSlot,
  handleChange
}: Props) => {
  
  const mergeDateAndTime = (date: number, timeSlot: number) => {
    const time = new Date(timeSlot)
    return new Date(date).setHours(
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds()
    )
  }
  
  const startsAt = mergeDateAndTime(date, timeSlot)
  
  if(availableTimeSlots.some((timeSlot) => timeSlot.startsAt === startsAt)) {
    const isChecked = startsAt === checkedTimeSlot
    
    return (
      <input
        name='startsAt'
        type='radio'
        value={startsAt}
        defaultChecked={isChecked}
        onChange={handleChange}
      />
    )
  }
  
  return null
}

export default RadioButtonIfAvailable
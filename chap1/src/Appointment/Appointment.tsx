import React from "react"

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
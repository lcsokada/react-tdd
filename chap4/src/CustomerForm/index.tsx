import { ChangeEvent, FormEvent, useState } from 'react'

interface Props {
  firstName?: string
  lastName?: string
  onSubmit?: (firstName?: string, secondName?: string) => void
}

const CustomerForm = ({
  firstName,
  lastName,
  onSubmit
}: Props) => {
  const [name, setName] = useState(firstName ?? '')
  const [secondName, setSecondName] = useState(lastName ?? '')
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit && onSubmit(name, secondName)
  }
  
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  
  const handleChangeSecondName = (event: ChangeEvent<HTMLInputElement>) => {
    setSecondName(event.target.value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='firstName'>First name</label>
      <input 
        type='text'
        name='firstName' 
        value={name}
        id='firstName'
        onChange={handleChangeName}
      />
      
      <label htmlFor='lastName'>Last name</label>
      <input 
        type='text'
        name='lastName'
        id='lastName'
        value={secondName}
        onChange={handleChangeSecondName}
      />
      
      <input type='submit' value='Add' />
    </form>
  )
}

export default CustomerForm

import { render, waitFor, queryByAttribute } from '@testing-library/react'
import { ok } from 'assert'
import AppointmentsDayViewLoader from '../components/AppointmentsDayViewLoader'

// jest.mock('../components/AppointmentsDaysView', () => () => <div id='AppointmentsDaysView' />) -> versao antiga

const mockedChild = jest.fn()
jest.mock('../components/AppointmentsDaysView', () => (props: {appointments: []}) => {
  mockedChild(props)
  return <div id='AppointmentsDaysView' />
})

describe('AppointmentsDayViewLoader', () => {
  const getById = queryByAttribute.bind(null, 'id')
  const today = new Date()
  const appointments = [
    {startsAt: today.setHours(9, 0, 0, 0)},
    {startsAt: today.setHours(10, 0, 0, 0)}
  ]
  
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(appointments) as unknown as Promise<Response>)
  })
  
  it('renders an AppointmentsDayView', async () => {
    const {container} = render(<AppointmentsDayViewLoader />)
    
    const childComponent = getById(container, 'AppointmentsDaysView')
    
    await waitFor(() => {
      expect(childComponent).toBeInTheDocument()
    })
  })
  
  it('initially passes empty array of appointments to AppointmentsDayView', async () => {
    render(<AppointmentsDayViewLoader />)
    
    await waitFor(() => {
      expect(mockedChild).toBeCalledWith({
        appointments: []
      })
    })
  })
  
  it('fetches data when component is mounted', async() => {
    const from = today.setHours(0)
    const to = today.setHours(23, 59, 59, 999)
    
    render(<AppointmentsDayViewLoader />)
    
    await waitFor(() => {
      expect(global.fetch).toBeCalledWith(`/appointments/${from}-${to}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
      })
    })
  })
  
  it('passes fetched appointments to AppointmentDayView once they have loaded', async() => {
    render(<AppointmentsDayViewLoader />)
    
    await waitFor(() => {
      expect(mockedChild).toBeCalledWith(
        {appointments}
      )
    })
  })
  
  it('re-requests appointments when today prop changes', async () => {
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const from = tomorrow.setHours(0, 0, 0, 0)
    const to = tomorrow.setHours(23, 59, 59, 999)
    
    const { rerender } = render(<AppointmentsDayViewLoader today={today}/>)
    rerender(<AppointmentsDayViewLoader today={tomorrow}/>)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenLastCalledWith(`/appointments/${from}-${to}`, expect.anything())
    })
  })
})
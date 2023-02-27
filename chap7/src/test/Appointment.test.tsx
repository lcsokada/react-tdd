import { act } from '@testing-library/react';
import ReactDOM from "react-dom/client";
import AppointmentsDaysView from '../components/AppointmentsDaysView';

describe('AppointmentDaysView', () => {
  let container: HTMLElement
  const today = new Date()
  const twoAppointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: {firstName: 'Ashley'}
    },
    {
      startsAt: today.setHours(13, 0),
      customer: {firstName: 'Jordan'}
    }
  ]
  
  beforeEach(() => {
    container = document.createElement('div')
    document.body.replaceChildren(container)
  })
  
  const render = (component: JSX.Element) => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      ReactDOM.createRoot(container).render(component)
    })
  }
  
  it('renders a div with the right id', () => {
    render(<AppointmentsDaysView appointments={[]} />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('div#appointmentsDayView')).not.toBeNull()
  })
  
  it('renders an ol element to display appointments', () => {
    render(<AppointmentsDaysView appointments={[]} />)
    // eslint-disable-next-line testing-library/no-node-access
    const listElement = document.querySelector('ol')
    expect(listElement).not.toBeNull()
  })
  
  it('renders an li for each appointment', () => {
    render(
      <AppointmentsDaysView 
        appointments={twoAppointments}
      />
    )
    
    // eslint-disable-next-line testing-library/no-node-access
    const listChildren = document.querySelectorAll('ol > li')
    expect(listChildren).toHaveLength(2)
  })
  
  it('renders the time of each appointment', () => {
    render(
      <AppointmentsDaysView
        appointments={twoAppointments}
      />
    )
    
    // eslint-disable-next-line testing-library/no-node-access
    const listChildren = document.querySelectorAll('li')
    expect(listChildren[0].textContent).toEqual('12:00')
    expect(listChildren[1].textContent).toEqual('13:00')
  })
  
  it('Initially shows a message saying there are no appointments today', () => {
    render(
      <AppointmentsDaysView appointments={[]} />
    )
    
    expect(document.body.textContent).toContain('There are no appointments scheduled for today')
  })
  
  it('selects the first appointment by default', () => {
    render(
      <AppointmentsDaysView 
        appointments={twoAppointments}
      />
    )
    
    expect(document.body.textContent).toContain('Ashley')
  })
  
  it('has a button element in each li', () => {
    render(
      <AppointmentsDaysView 
        appointments={twoAppointments}
      />
    )
    
    // eslint-disable-next-line testing-library/no-node-access
    const buttons = document.querySelectorAll('li > button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].nodeName).toEqual('button'.toUpperCase())
  })
  
  it('renders another appointment when selected', () => {
    render(
      <AppointmentsDaysView appointments={twoAppointments} />
    )
    
    // eslint-disable-next-line testing-library/no-node-access
    const button = document.querySelectorAll('button')[1]
    act(() => button.click())
    expect(document.body.textContent).toContain('Jordan')
  })
})

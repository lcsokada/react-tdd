import { AppointmentsDaysView } from "../Appointment/Appointment";
import { initializeReactContainer, render, click, textOf, elements, element, typesOf } from './reactTestExtensions';

describe('AppointmentDaysView', () => {
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
    initializeReactContainer()
  })
  
  it('renders a div with the right id', () => {
    render(<AppointmentsDaysView appointments={[]} />)
    expect(element('div#appointmentsDayView')).not.toBeNull()
  })
  
  it('renders an ol element to display appointments', () => {
    render(<AppointmentsDaysView appointments={[]} />)
    expect(element('ol')).not.toBeNull()
  })
  
  it('renders an li for each appointment', () => {
    render(
      <AppointmentsDaysView 
        appointments={twoAppointments}
      />
    )
    
    const listChildren = elements('ol > li')
    expect(listChildren).toHaveLength(2)
  })
  
  it('renders the time of each appointment', () => {
    render(
      <AppointmentsDaysView
        appointments={twoAppointments}
      />
    )
    
    expect(textOf(elements('li'))).toEqual(['12:00', '13:00'])
  })
  
  it('Initially shows a message saying there are no appointments today', () => {
    render(
      <AppointmentsDaysView appointments={[]} />
    )
    
    expect(document.body).toContainText('There are no appointments scheduled for today') //<--
  })
  
  it('selects the first appointment by default', () => {
    render(
      <AppointmentsDaysView 
        appointments={twoAppointments}
      />
    )
    
    expect(document.body).toContainText('Ashley') //<--
  })
  
  it('has a button element in each li', () => {
    render(
      <AppointmentsDaysView 
        appointments={twoAppointments}
      />
    )
    
    expect(typesOf(elements('li > button'))).toEqual(['button', 'button'])
  })
  
  it('renders another appointment when selected', () => {
    render(
      <AppointmentsDaysView appointments={twoAppointments} />
    )
    
    const button = elements('button')[1] as HTMLElement
    click(button)
    expect(document.body).toContainText('Jordan')
  })
  
})

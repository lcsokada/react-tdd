import { render } from '@testing-library/react'
import AppointmentForm from '../AppointmentForm'
import { click, element, elements } from './utils/reactTestExtensions'

describe('AppointmentForm', () => {
  
  const labelsOfAllOptions = (element: Element | null) => {
    return element ?  Array.from(element.childNodes).map(node => node.textContent).slice(1) : []
  }
  
  const findOption = (element: Element | null, textContent: string) => {
    const options = element ? Array.from(element.childNodes) : []
    return options.find(option => option.textContent === textContent)
  }
  
  const cellsWithRadioButtons = () => {
    // eslint-disable-next-line testing-library/no-node-access
    const radioButtonsParents = Array.from(elements('input[type=radio]')).map(el => el.parentElement as Element)
    const parentNode = Array.from(elements('td'))
    
    return radioButtonsParents.map(el => parentNode.indexOf(el))
  }
  
  it('renders a form', () => {
    render(<AppointmentForm />)
    expect(element('form')).not.toBeNull()
  })
  
  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />)
      
      const serviceField = element('select')
      expect(serviceField).not.toBeNull()
      expect(serviceField?.tagName).toEqual('SELECT')
    })
  
    it('has a blank value as the first value', () => {
      render(<AppointmentForm />)
      const firstOption = element('select')?.childNodes[0]
      expect(firstOption).toHaveTextContent('')
    })
    
    it('lists all salon services', () => {
      const services = ['Cut', 'Blow-dry']
      
      render(
        <AppointmentForm selectableServices={services} />
      )
      
      const selectElement = element('select')
      
      expect(labelsOfAllOptions(selectElement)).toEqual(expect.arrayContaining(services))
    })
    
    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry']
      const appointment = {service: 'Blow-dry'}
      render(
        <AppointmentForm 
          selectableServices={services}
          original={appointment}
        />
      )
      
      const option = findOption(element('select'), 'Blow-dry') as HTMLOptionElement
      expect(option.selected).toBe(true)
    })
  })
  
  describe('time slot table', () => {
    const oneDayInMs = 24 * 60 * 60 * 1000
    const today = new Date()
    const tomorrow = new Date(today.getTime() + oneDayInMs)
    const availableTimeSlots = [
      {startsAt: today.setHours(9, 0, 0, 0)},
      {startsAt: today.setHours(9, 30, 0, 0)},
      {startsAt: tomorrow.setHours(9, 30, 0, 0)}
    ]
    
    const startsAtField = (index: number) => {
      const nodes = Array.from(elements('input[name=startsAt]'))[index]
      
      return nodes as HTMLInputElement
    }
    
    it('renders a table for time slots with an id', () => {
      render(<AppointmentForm />)
      expect(element('table#time-slots')).not.toBeNull()
    })
    
    it('renders a time slot for every half an hour between open and close times', () => {
      render(
        <AppointmentForm 
          salonOpensAt={9}
          salonClosesAt={11}
        />
      )
      
      const timesOfDayHeadings = elements('tbody > tr > th')
      expect(timesOfDayHeadings[0]).toContainText('09:00')
      expect(timesOfDayHeadings[1]).toContainText('09:30')
      expect(timesOfDayHeadings[3]).toContainText('10:30')
    })
    
    it('renders an empty cell at the start of the header row', () => {
      render(
        <AppointmentForm />
      )
      
      const headerRow = element('thead > tr')
      // eslint-disable-next-line testing-library/no-node-access
      expect(headerRow?.firstChild).toContainText('')
    })
    
    it('renders a week of available dates', () => {
      const specificDate = new Date(2018, 11, 1)
      render(
        <AppointmentForm
          today={specificDate}
        />
      )
      
      //pega todos os th, exceto o primeiro (first child)
      const dates = elements('thead > * th:not(:first-child)') 
      
      expect(dates).toHaveLength(7)
      expect(dates[0]).toContainText('Sat 01')
      expect(dates[1]).toContainText('Sun 02')
      expect(dates[6]).toContainText('Fri 07')
    })
    
    it('renders radio buttons in the corret table cell', () => {
      
      render(
        <AppointmentForm 
          availableTimeSlots={availableTimeSlots}
          today={today}
          salonOpensAt={9}
          salonClosesAt={11}
        />
      )
      
      expect(cellsWithRadioButtons()).toEqual(expect.arrayContaining([0, 7, 8]))
    })
    
    it('does not render radio buttons for inavailable time slots', () => {
      render(
        <AppointmentForm 
          availableTimeSlots={[]}
          salonOpensAt={9}
          salonClosesAt={11}
        />
      )
      
      expect(elements('input[type=radio]')).toHaveLength(0)
    })
    
    it('sets radio button valoues to the startsAt value of the corresponding appointment', () => {

      
      render(
        <AppointmentForm 
          today={today}
          availableTimeSlots={availableTimeSlots}
          salonOpensAt={9}
          salonClosesAt={11}
        />
      )
      
      const allRadioValues = Array.from(elements('input[type=radio]')).map(element => parseInt(element.getAttribute('value') ?? ''))
      const allSlotTimes = availableTimeSlots.map(element => element.startsAt)
      
      expect(allRadioValues).toEqual(allSlotTimes)
    })
    
    it('pre-selects the existing value', () => {
      const appointment = availableTimeSlots[1].startsAt
      
      render(
        <AppointmentForm
          original={{service: '', startsAt: appointment}}
          availableTimeSlots={availableTimeSlots}
          today={today}
          salonOpensAt={9}
          salonClosesAt={11}
        />
      )
      
      expect(startsAtField(1).checked).toEqual(true)
    })
    
    it('renders a submit button', () => {
      render(
        <AppointmentForm />
      )
      
      expect(element('input[type=submit]')).not.toBeNull()
    })
    
    it('saves existing value when submitted', () => {
      expect.hasAssertions()
      const appointment = availableTimeSlots[1].startsAt
      
      render(
        <AppointmentForm
          original={{service: '', startsAt: appointment}}
          availableTimeSlots={availableTimeSlots}
          today={today}
          onSubmit={({startsAt}) => expect(startsAt).toEqual(availableTimeSlots[1].startsAt)}
        />
      )
      
      click(element('input[type=submit]') as HTMLElement)
    })
    
    it('saves new value when submitted',() => {
      expect.hasAssertions()
      const appointment = availableTimeSlots[0].startsAt
      
      render(
        <AppointmentForm
          original={{service: '', startsAt: appointment}}
          availableTimeSlots={availableTimeSlots}
          today={today}
          salonOpensAt={9}
          salonClosesAt={11}
          onSubmit={({startsAt}) => expect(startsAt).toEqual(availableTimeSlots[1].startsAt)}
        />
        
      )
      click(startsAtField(1))
      click(element('input[type=submit]') as HTMLElement)
    })
  })
})
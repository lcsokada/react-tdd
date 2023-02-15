import { fireEvent, render } from '@testing-library/react'
import CustomerForm from '../CustomerForm'

import { click, element, elements, initializeReactContainer, submit } from './utils/reactTestExtensions'

describe('CustomerForm', () => {
  beforeEach(() => { 
    initializeReactContainer()
  })
  
  const singleArgumentSpy = <T extends Object>() => {
    let receivedArguments: T
    return {
      fn: (args: T) => (receivedArguments = args),
      receivedArguments: () => receivedArguments,
      receivedArgument: (index: number) => {
        const keys = Object.keys(receivedArguments)
        return receivedArguments[keys[index] as keyof typeof receivedArguments]
      }
    }
  }
  
  it('renders a form', () => {
    render(<CustomerForm />)
    expect(element('form')).not.toBeNull()
  })
  
  const itRendersAsATextBox = (fieldName: string, fieldIndex: number) => { 
    it('renders as a text box', () => {
      render(<CustomerForm />)
      
      // eslint-disable-next-line testing-library/no-node-access
      const fields = elements(fieldName)
      
      expect(fields[fieldIndex]).not.toBeNull()
      expect(fields[fieldIndex]?.nodeName).toEqual('INPUT')
      expect(fields[fieldIndex]).toHaveAttribute('type', 'text')
    })
  }
  
  const itRendersALabel = (htmlFor: string) => { 
    it('renders a label', () => {
      render(<CustomerForm />)
      const label = element(`label[for=${htmlFor}]`)
      expect(label).not.toBeNull()
    })
  }
  
  const itIncludesAnExistingValueForField = (firstName: string, secondName: string, fieldIndex: number) => { 
    it('includes the existing value for field', () => {
      const values = [firstName, secondName]
      render(<CustomerForm firstName={values[0]} lastName={values[1]} />)
      
      // eslint-disable-next-line testing-library/no-node-access
      const fields = elements('form > input')
      
      expect(fields[fieldIndex]).toHaveAttribute('value' ,values[fieldIndex])
    })
  }
  
  describe('first name field', () => {
    itRendersAsATextBox('form > input', 0)
    itRendersALabel('firstName')
    itIncludesAnExistingValueForField('Ashley', 'Dias', 0)
    
    it('renders first name label', () => {
      render(<CustomerForm />)
      const label = element('label[for=firstName]')
      expect(label).toContainText('First name')
    })
    
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />)
      expect(element('form > input')?.id).toEqual('firstName')
    })
    
    it('renders a submit button', () => {
      render(<CustomerForm />)
      const button = element('input[type=submit]')
      expect(button).toBeInTheDocument()
    })
    
    it('saves existing value when submitted', () => {
      const firstName = 'Ashley'
      const submitSpy = singleArgumentSpy<{firstName?: string, secondName?: string}>()
      
      render(
        <CustomerForm 
          firstName={firstName}
          onSubmit={submitSpy.fn}
        />
      )
      
      const button = element('input[type=submit]') as HTMLElement
      click(button)
      
      expect(submitSpy.receivedArguments().firstName).toEqual(firstName)
      //ou
      //expect(submitSpy.receivedArgument(0)).toEqual(firstName)
    })
    
    it('prevents the default action when submitting the form', () => {
      render(<CustomerForm onSubmit={() => {}} />)
      
      const form = element('form') as HTMLFormElement
      const event = submit(form)
      expect(event.defaultPrevented).toBe(true)
    })
    
    it('saves new name when submitted', () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          onSubmit={({firstName} : {firstName?: string}) => {
            expect(firstName).toEqual('Jamie')
          }}
        />
      )
      
      const field = element('form > input')
      field && fireEvent.change(field, {
        target: {value: 'Jamie'}
      })
      
      const button = element('input[type=submit]') as HTMLElement
      click(button)
    })
  })
  
  describe('last name field', () => {
    itRendersAsATextBox('form > input', 1)
    itRendersALabel('lastName')
    itIncludesAnExistingValueForField('Ashley', 'Dias', 1)
    
    it('saves existing value when submitted', () => {
      const params = {firstName: 'Ashley', secondName: 'Dias'}
      const submitSpy = singleArgumentSpy<{firstName?: string, secondName?: string}>()
      
      render(
        <CustomerForm 
          firstName='Ashley'
          lastName='Dias'
          onSubmit={submitSpy.fn}
        />
      )
      
      const button = element('input[type=submit]') as HTMLElement
      click(button)
      
      expect(submitSpy.receivedArguments()).toBeCalledWithSpy(params)
      expect(submitSpy.receivedArgument(1)).toBe('Dias')
    })
    
    it('saves new name when submitted', () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          onSubmit={({firstName, secondName} :{firstName?: string, secondName?: string}) => {
            expect(secondName).toEqual('Dias')
          }}
        />
      )
      
      const fields = elements('form > input')
      fields && fireEvent.change(fields[1], {
        target: {value: 'Dias'}
      })
      
      const button = element('input[type=submit]') as HTMLElement
      click(button)
    })
  })
})

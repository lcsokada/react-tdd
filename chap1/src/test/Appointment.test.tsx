import React from 'react'
import { act } from 'react-dom/test-utils';
import { Appointment } from "../Appointment/Appointment";
import ReactDOM from "react-dom/client";
import { JsxElement } from 'typescript';

describe('Appointment', () => {
  
  let container: HTMLElement
  
  beforeEach(() => {
    container = document.createElement('div')
    document.body.replaceChildren(container)
  })
  
  const renderComponent = (component: JSX.Element) => {
    //act -> espera o comonente ser renderizado
    act(() => 
      //cria o container e renderiza o componente dentro desse
      ReactDOM.createRoot(container).render(component)
    )
  }
  
  it('renders the cosumer first name', () => {
    const customer = "Ashley"
    const component = ( <Appointment firstName={customer}/> )
    
    renderComponent(component)
    expect(document.body.textContent).toContain('Ashley')
  })
  
  it('renders the cosumer first name 2', () => {
    const customer = "Lucas"
    const component = ( <Appointment firstName={customer}/> )
    
    renderComponent(component)
    expect(document.body.textContent).toContain(customer)
  })
})
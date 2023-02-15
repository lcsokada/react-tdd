import { act } from "react-dom/test-utils"
import ReactDOM from "react-dom/client";
import React from "react";

export let container: HTMLDivElement

export const initializeReactContainer = () => {
  container = document.createElement('div')
  document.body.replaceChildren(container)
}

export const render = (component: React.ReactNode) => {
  act(() => {
    ReactDOM.createRoot(container).render(component)
  })
}

export const click = (element: HTMLElement) => {
  act(() => {
    element.click()
  })
}

export const element = (selector: string) => document.querySelector(selector)

export const elements = (selector: string) =>  document.querySelectorAll(selector)


export const typesOf = (elements: NodeListOf<Element>) => {
  const elementsArray = Array.from(elements)
  return elementsArray.map(element => element.nodeName.toLowerCase())
}

export const textOf = (elements: NodeListOf<Element>) => {
  const elementsArray = Array.from(elements)
  return elementsArray.map(element => element.textContent)
}

export const submit = (formElement: HTMLFormElement) => {
  const event = new Event('submit', {
    bubbles: true,
    cancelable: true
  })
  
  act(() => formElement.dispatchEvent(event))
  return event
}
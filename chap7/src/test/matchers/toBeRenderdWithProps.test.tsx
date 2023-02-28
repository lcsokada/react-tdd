import { render } from '@testing-library/react';
import { toBeRenderedWithProps } from './toBeRenderedWithProps';

describe('toBeRenderedWithProps', () => {
  let component = jest.fn((props?) => <div />)
  it('return pass is true when mock has been rendered', () => {
    render(component())
    const { pass } = toBeRenderedWithProps(component, {})
    expect(pass).toBe(true)
  })
  
  it('returns pass is false when the mock has not been rendered', () => {
    const { pass } = toBeRenderedWithProps(component, {})
    expect(pass).toBe(false)
  })
  
  it('returns pass is false qhen the properties do not match', () => {
    render (component({a: 'b'}))
    const {pass} = toBeRenderedWithProps(
      component, {
        c: 'd'
      }
    )
    
    expect(pass).toBe(false)
  })
  
  it('returns pass is true when the properties of the last render match', () => {
    const { rerender } = render(component({a: 'b'}))
    rerender(component({c: 'd'}))
    const { pass } = toBeRenderedWithProps(component, {
      c: 'd'
    })
    
    expect(pass).toBe(true)
  })
})
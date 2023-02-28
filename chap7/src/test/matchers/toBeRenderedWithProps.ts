export const toBeRenderedWithProps = (
  mockedComponent: jest.Mock,
  expectedProps: Object
) => {
  console.log('entrou')
  const message = () => ''
  const mockedCall = mockedComponent.mock.calls.at(-1)
  
  if(!mockedCall) {
    return {pass: false, message}
  }
  
  const actualProps = mockedCall[0]
  const objectKeys = actualProps ? Object.keys(actualProps) : []
  console.log(objectKeys)
  
  for(let key of objectKeys) {
    if(actualProps[key] !== expectedProps[key as keyof typeof expectedProps]) {
      return {pass: false, message}
    }
  }
  
  return {pass: true, message}
}
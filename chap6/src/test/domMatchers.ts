import {
  toContainText
} from './matchers/toContainText'

expect.extend({
  toContainText,
  toBeCalledWithSpy(received: Object, expectedArguments: Object) {
    console.log('received = ', received)
    console.log('expected = ', expectedArguments)
    if(received === undefined) {
      return {
        pass: false,
        message: () => 'Spy was not called'
      }
    }
    
    const notMatch = !this.equals(
      received,
      expectedArguments
    )
    
    if(notMatch) {
      return {
        pass: false,
        message: () => 'Spy called with the wrong arguments: ' + received + '.'
      }
    }
    
    return {
      pass: true,
      message: () => 'Spy was called'
    }
  }
})

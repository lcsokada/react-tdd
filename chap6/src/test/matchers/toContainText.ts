import {
  matcherHint,
  printExpected,
  printReceived
} from 'jest-matcher-utils'

export const toContainText = (received: Element | object & {textContent: string}, expectedText: string) => {  
  const pass = received.textContent?.includes(expectedText) ?? false
  const sourceHint = () => matcherHint(
      'toContainText',
      'element',
      printExpected(expectedText),
      { isNot: pass }
    )
  
  const actualTextHint = () => "Actual text: " + printReceived(received.textContent)
  const message = () => [sourceHint(), actualTextHint()].join("\n\n")
  
  return {pass, message}
}
export const stripTerminalColor = (text: string) => {
  return text.replace(/\x1B\[\d+m/g, "")
}
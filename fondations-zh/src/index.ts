export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  // implement
}

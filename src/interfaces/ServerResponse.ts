export default interface ServerResponse {
  messageReceived: string
  operation: string | Record<string, unknown> | null
  success: boolean
  error: string | Record<string, unknown> | null
  response: string | Record<string, unknown> | null
}

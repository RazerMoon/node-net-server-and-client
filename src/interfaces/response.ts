/**
 * Response to request.
 */
export interface ServerResponse {
  messageReceived: string
  remoteAddress?: string
  timeOfResponse?: string
  command: string | Record<string, unknown> | null
  success: boolean
  error: string | Record<string, unknown> | null
  response: string | Record<string, unknown> | null
}

/**
 * Used for building response requests.
 */
export interface _ServerResponse {
  messageReceived?: string
  remoteAddress?: string
  timeOfResponse?: string
  command?: string | Record<string, unknown> | null
  success?: boolean
  error?: string | Record<string, unknown> | null
  response?: string | Record<string, unknown> | null
}

export interface ResponseContainer {
  responses: ServerResponse[]
}

export interface CommandError {
  command: string | Record<string, unknown>
  success: boolean
  error: string | Record<string, unknown>
}

export interface CommandSuccess {
  command: string | Record<string, unknown>
  response: string | Record<string, unknown>
}

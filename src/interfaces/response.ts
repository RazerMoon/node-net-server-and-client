/**
 * Response record.
 */
export interface ServerRecord {
  messageReceived: string
  remoteAddress: string
  timeOfResponse: string
  command: string | { type?: string; args?: unknown[] } | null
  success: boolean
  error: string | Record<string, unknown> | null
  response: string | Record<string, unknown> | string[] | null
}

/**
 * Consists of an address and time
 */
export type RecordDetails = Pick<
  ServerRecord,
  "remoteAddress" | "timeOfResponse"
>

/**
 * Response to request.
 */
export type ServerResponse = Omit<
  ServerRecord,
  "remoteAddress" | "timeOfResponse"
>

export interface RecordContainer {
  responses: ServerRecord[]
}

export type CommandError = Pick<ServerResponse, "command" | "success" | "error">

export type CommandSuccess = Pick<ServerResponse, "command" | "response">

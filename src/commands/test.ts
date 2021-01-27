import { CommandSuccess, _ServerResponse } from "../interfaces/response"

/**
 * Adds two numbers.
 */
export function ping(): _ServerResponse {
  return <CommandSuccess>{
    command: { type: "PING" },
    response: "PONG",
  }
}

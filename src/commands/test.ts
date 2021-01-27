import { CommandSuccess, _ServerResponse } from "../interfaces/response"

/**
 * Returns a pong.
 */
export function ping(): _ServerResponse {
  return <CommandSuccess>{
    command: { type: "PING" },
    response: "PONG",
  }
}

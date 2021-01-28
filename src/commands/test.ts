import { CommandSuccess } from "../interfaces/response"

/**
 * Returns a pong.
 */
export function ping(): CommandSuccess {
  return <CommandSuccess>{
    command: { type: "PING" },
    response: "PONG",
  }
}

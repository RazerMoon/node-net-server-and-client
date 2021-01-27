import {
  CommandError,
  CommandSuccess,
  _ServerResponse,
} from "../interfaces/response"

/**
 * Adds two numbers.
 */
export function add(param1: string, param2: string): _ServerResponse {
  const num1 = parseInt(param1)
  const num2 = parseInt(param2)

  if (!(isNaN(num1) || isNaN(num2))) {
    return <CommandSuccess>{
      command: { type: "ADD", args: [num1, num2] },
      response: (num1 + num2).toString(),
    }
  } else {
    return <CommandError>{
      command: { type: "ADD" },
      success: false,
      error: "One of the arguments is NaN",
    }
  }
}

/**
 * Subtracts two numbers.
 */
export function sub(param1: string, param2: string): _ServerResponse {
  const num1 = parseInt(param1)
  const num2 = parseInt(param2)

  if (!(isNaN(num1) || isNaN(num2))) {
    return <CommandSuccess>{
      command: { type: "SUB", args: [num1, num2] },
      response: (num1 - num2).toString(),
    }
  } else {
    return <CommandError>{
      command: { type: "SUB" },
      success: false,
      error: "One of the arguments is NaN",
    }
  }
}

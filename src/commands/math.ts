import { CommandError, CommandSuccess } from "../interfaces/response"

/**
 * Adds two numbers.
 */
export function add(
  param1: string,
  param2: string
): CommandSuccess | CommandError {
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
export function subtract(
  param1: string,
  param2: string
): CommandSuccess | CommandError {
  const num1 = parseInt(param1)
  const num2 = parseInt(param2)

  if (!(isNaN(num1) || isNaN(num2))) {
    return <CommandSuccess>{
      command: { type: "SUBTRACT", args: [num1, num2] },
      response: (num1 - num2).toString(),
    }
  } else {
    return <CommandError>{
      command: { type: "SUBTRACT" },
      success: false,
      error: "One of the arguments is NaN",
    }
  }
}

/**
 * Multiplies two numbers.
 */
export function multiply(
  param1: string,
  param2: string
): CommandSuccess | CommandError {
  const num1 = parseInt(param1)
  const num2 = parseInt(param2)

  if (!(isNaN(num1) || isNaN(num2))) {
    return <CommandSuccess>{
      command: { type: "MULTIPLY", args: [num1, num2] },
      response: (num1 * num2).toString(),
    }
  } else {
    return <CommandError>{
      command: { type: "MULTIPLY" },
      success: false,
      error: "One of the arguments is NaN",
    }
  }
}

/**
 * Divides two numbers.
 */
export function divide(
  param1: string,
  param2: string
): CommandSuccess | CommandError {
  const num1 = parseInt(param1)
  const num2 = parseInt(param2)

  if (!(isNaN(num1) || isNaN(num2))) {
    return <CommandSuccess>{
      command: { type: "DIVIDE", args: [num1, num2] },
      response: (num1 / num2).toString(),
    }
  } else {
    return <CommandError>{
      command: { type: "DIVIDE" },
      success: false,
      error: "One of the arguments is NaN",
    }
  }
}

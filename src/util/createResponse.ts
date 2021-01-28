import commands from "../commands"
import { uptime, arch, platform, release, type, version } from "os"

import {
  CommandError,
  CommandSuccess,
  ServerResponse,
} from "../interfaces/response"

export default function createResponse(data: Buffer): ServerResponse {
  const parsedMsg = data.toString("utf8")
  const splitMsg = parsedMsg.split(" ")

  const resObj: ServerResponse = {
    messageReceived: parsedMsg,
    command: null,
    success: true,
    error: null,
    response: null,
  }

  if (splitMsg.length > 0) {
    if (splitMsg[0].toLowerCase() === "help") {
      Object.assign(resObj, <CommandSuccess>{
        command: { type: "HELP" },
        response: { commands: Object.keys(commands) },
      })
    } else if (splitMsg[0].toLowerCase() === "systeminfo") {
      Object.assign(resObj, <CommandSuccess>{
        command: { type: "SYSTEMINFO" },
        response: {
          arch: arch(),
          platform: platform(),
          type: type(),
          version: version(),
          release: release(),
          uptime: uptime(),
        },
      })
    } else if (splitMsg[0].toLowerCase() in commands) {
      // We are taking off the safety belt.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const command = commands[splitMsg[0].toLowerCase()]

      if (splitMsg.length - 1 === command.length) {
        // Check number of params matches number of params in func.
        Object.assign(resObj, command(...splitMsg.slice(1)))
      } else {
        Object.assign(resObj, <CommandError>{
          command: { type: command.name.toUpperCase() },
          success: false,
          error: "Wrong number of arguments provided",
        })
      }
    }
    /*
          switch (splitMsg[0]) {
            case add.name.toUpperCase():
              if (splitMsg.length - 1 === add.length) {
                Object.assign(resObj, add(splitMsg[1], splitMsg[2]))
              } else {
                Object.assign(resObj, <CommandError>{
                  command: { type: add.name.toUpperCase() },
                  success: false,
                  error: "Wrong number of arguments provided",
                })
              }
              break
            default:
              break
          }
          */
  }

  return resObj
}

import { createServer } from "net"
import {
  CommandError,
  ServerResponse,
  ResponseContainer,
} from "../interfaces/response"
//import { add } from "../commands/math"
import * as _math from "../commands/math"
import * as _test from "../commands/test"
const commands = { ..._math, ..._test }

import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"

const db = low(new FileSync<ResponseContainer>("db.json"))

db.defaults(<ResponseContainer>{ responses: [] }).write()

export default function startServer(): void {
  const server = createServer((socket) => {
    socket.on("error", (err) => {
      switch (err.message.slice(5)) {
        case "ECONNRESET":
          console.log("The connection was reset!")
          break
        default:
          console.log("An error occured!\n")

          console.log(err)
          break
      }

      console.log("\n")
    })

    socket.on("connect", () => {
      console.log(`Connection established!\n`)
    })

    socket.on("data", (data) => {
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
        if (splitMsg[0].toLowerCase() in commands) {
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

      socket.write(JSON.stringify(resObj))
      resObj.remoteAddress = socket.remoteAddress
      resObj.timeOfResponse = new Date().toLocaleString("en-GB", {
        timeZone: "UTC",
      })

      db.get("responses").push(resObj).write()

      console.log(resObj)
      console.log("\n")
    })

    socket.on("close", () => {
      console.log("Connection closed!\n")
    })
  })

  const { PORT = "1337", IP_ADDRESS = "127.0.0.1" } = process.env
  server.listen(parseInt(PORT), IP_ADDRESS)
  console.log(`Listening on ${IP_ADDRESS}:${PORT}\n`)
}

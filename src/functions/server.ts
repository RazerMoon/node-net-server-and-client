import Lowdb from "lowdb"
import { createServer as _createServer, Server } from "net"
import {
  RecordContainer,
  RecordDetails,
  ServerRecord,
} from "../interfaces/response"
import createResponse from "../util/createResponse"

import initDB from "./db"
let db: Lowdb.LowdbSync<RecordContainer>

const { PORT = "1337", IP_ADDRESS = "127.0.0.1" } = process.env

/**
 * Creates the server.
 */
function createServer(): Server {
  return _createServer((socket) => {
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
      const resObj = createResponse(data)

      socket.write(JSON.stringify(resObj))

      Object.assign(resObj, <RecordDetails>{
        remoteAddress: socket.remoteAddress,
        timeOfResponse: new Date().toLocaleString("en-GB", {
          timeZone: "UTC",
        }),
      })

      // Writes response to db
      db.get("responses")
        .push(<ServerRecord>resObj)
        .write()

      console.log(<ServerRecord>resObj)
      console.log("\n")
    })

    socket.on("close", () => {
      console.log("Connection closed!\n")
    })
  })
}

/**
 * Starts server.
 */
export default function startServer(): void {
  db = initDB()

  const server = createServer()

  server.listen(parseInt(PORT), IP_ADDRESS)
  console.log(`Listening on ${IP_ADDRESS}:${PORT}\n`)
}

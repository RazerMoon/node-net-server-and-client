import { createServer } from "net"
import ServerResponse from "../interfaces/ServerResponse"

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
      console.log("Connection established!\n")
    })

    socket.on("data", (data) => {
      const parsedMsg = data.toString("utf8")
      const splitMsg = parsedMsg.split(" ")

      const resObj: ServerResponse = {
        messageReceived: parsedMsg,
        operation: null,
        success: true,
        error: null,
        response: null,
      }

      if (splitMsg.length > 0) {
        switch (splitMsg[0]) {
          case "ADD":
            if (splitMsg.length !== 3) {
              Object.assign(resObj, {
                operation: { type: "ADD" },
                success: false,
                error: "Wrong number of arguments provided",
              })
              break
            }

            const num1 = parseInt(splitMsg[1])
            const num2 = parseInt(splitMsg[2])

            if (!(isNaN(num1) || isNaN(num2))) {
              Object.assign(resObj, {
                operation: { type: "ADD", args: [num1, num2] },
                response: (num1 + num2).toString(),
              })
            } else {
              Object.assign(resObj, {
                operation: { type: "ADD" },
                success: false,
                error: "One of the arguments is NaN",
              })
            }
            break
          default:
            break
        }
      }

      console.log(resObj)
      console.log("\n")
      socket.write(JSON.stringify(resObj))
    })

    socket.on("close", () => {
      console.log("Connection closed!\n")
    })
  })

  server.listen(1337, "127.0.0.1")
  console.log("Listening...\n")
}

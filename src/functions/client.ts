import { Socket } from "net"

import _prompt from "prompt-sync"
const prompt = _prompt({ sigint: true })

const client = new Socket()

let alive = false

client.on("error", (err) => {
  alive = false

  switch (err.message.split(" ")[1]) {
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

client.on("data", (data) => {
  console.log("Received:\n")
  console.log(JSON.parse(data.toString("utf8")))
  console.log("\n")
  //client.destroy() // kill client after server's response
})

client.on("close", () => {
  alive = false

  console.log("Connection closed")
})

function messageLoop() {
  if (alive) {
    const msg = prompt("Send message: ")
    alive && client.write(msg)

    setTimeout(() => {
      messageLoop()
    }, 100)
  }
}

export default function startClient(): void {
  const { PORT = "1337", IP_ADDRESS = "127.0.0.1" } = process.env
  client.connect(parseInt(PORT), IP_ADDRESS, () => {
    console.log(`Connected to ${IP_ADDRESS}:${PORT}\n`)

    alive = true

    client.write("Hello, server! Love, Client.")

    setTimeout(() => {
      messageLoop()
    }, 100)
  })
}

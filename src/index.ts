import startClient from "./functions/client"
import startServer from "./functions/server"

switch (process.argv.slice(2)[0]) {
  case "server":
    console.log("Starting server...\n")
    startServer()
    break
  case "client":
    console.log("Starting client...\n")
    startClient()
    break
  default:
    console.log("Sorry, that is not something I know how to do.")
    break
}

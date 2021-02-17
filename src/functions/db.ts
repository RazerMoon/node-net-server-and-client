import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import { RecordContainer } from "../interfaces/response"

import { existsSync, mkdirSync } from "fs"

export default function initDB(): low.LowdbSync<RecordContainer> {
  const dir = "./logs"
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }

  const db = low(new FileSync<RecordContainer>("./logs/db.json"))
  db.defaults(<RecordContainer>{ responses: [] }).write()

  return db
}

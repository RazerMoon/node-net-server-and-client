import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import { RecordContainer } from "../interfaces/response"

export default function initDB(): low.LowdbSync<RecordContainer> {
  const db = low(new FileSync<RecordContainer>("db.json"))
  db.defaults(<RecordContainer>{ responses: [] }).write()

  return db
}

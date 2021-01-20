import { strictEqual } from "assert"
import perpendicularDistance from "../functions/perpendicularDistance"

describe("Math", function () {
  describe("Perpendicular Distance", function () {
    it("should return 5 when the function 4x + 3y + 10 and point (3,1) are passed", function () {
      strictEqual(perpendicularDistance(4, 3, 10, 3, 1), 5)
    })
  })
})

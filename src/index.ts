import _prompt from "prompt-sync"
import perpendicularDistance from "./functions/perpendicularDistance"
const prompt = _prompt({ sigint: true })

const firstTerm = parseFloat(prompt("Enter the first term of a function: "))
const secondTerm = parseFloat(prompt("Enter the second term: "))
const thirdTerm = parseFloat(prompt("Enter the third term: "))

const pointX = parseFloat(prompt("Enter the x of a point: "))
const pointY = parseFloat(prompt("Enter the y: "))

console.log(
  `The perpendicular distance is: ${perpendicularDistance(
    firstTerm,
    secondTerm,
    thirdTerm,
    pointX,
    pointY
  )}`
)

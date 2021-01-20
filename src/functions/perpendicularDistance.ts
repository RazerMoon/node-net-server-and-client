/**
 * Gets the perpendicular distance between a point and a line.
 * @param firstTerm First term of the function
 * @param secondTerm Second term of the function
 * @param thirdTerm Third term of the function
 * @param pointX The x of the point
 * @param pointY The y of the point
 */
export default function perpendicularDistance(
  firstTerm: number,
  secondTerm: number,
  thirdTerm: number,
  pointX: number,
  pointY: number
): number {
  return (
    Math.abs(firstTerm * pointX + secondTerm * pointY + thirdTerm) /
    Math.sqrt(Math.pow(firstTerm, 2) + Math.pow(secondTerm, 2))
  )
}

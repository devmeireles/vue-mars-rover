/**
 * Represents a plateau on Mars.
 * @class
 */
class Plateau {
  private size: number
  public field: number[][]

  /**
   * Creates a new Plateau instance.
   * @constructor
   * @param {number} size - The size of the plateau.
   */
  constructor(size: number) {
    this.size = size
    this.field = []
  }

  /**
   * Calculates and initializes the plateau grid with zeros.
   * @public
   */
  public calculatePlateau(): void {
    const result: number[][] = []

    for (let i = 0; i < this.size; i++) {
      const subArray: number[] = []
      for (let j = 0; j < this.size; j++) {
        subArray.push(0)
      }
      result.push(subArray)
    }

    this.field = result
  }
}

export default Plateau

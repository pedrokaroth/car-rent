const Repository = require('../repository/Repository')

class CarService {
  constructor({ cars }) {
    this.model = new Repository(cars)
  }

  /**
   * Return random position from array
   * @param {Array} array
   * @return {Number}  
   */
  getRandomPositionFromArray(array) {
    const listLength = array.length

    return Math.floor(
      Math.random() * listLength
    )
  }

  /**
   * Choosen a random car from Category
   * @param {import('../entities/CarCategory')} carCategory 
   * @return {String}
   */
  choosenRandomCar(carCategory) {
    const carPosition = this.getRandomPositionFromArray(carCategory.carIds)
    return carCategory.carIds[carPosition]
  }

  /**
 * Get a random available car
 * @param {import('../entities/CarCategory')} carCategory 
 * @return {Object}
 */
  getAvailableCar(carCategory) {
    const carId = this.choosenRandomCar(carCategory)
    return this.model.findById(carId)
  }


}

module.exports = CarService
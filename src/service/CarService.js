const Repository = require('../repository/Repository')

class CarService {
  constructor({ cars }) {
    this.model = new Repository(cars)
    this.tax = [
      { from: 18, to: 25, then: 1.1 },
      { from: 26, to: 30, then: 1.5 },
      { from: 31, to: 100, then: 1.3 }
    ]
  }

  /**
   * Return currency price formatted
   * @param {Number} price 
   */
  moneyFormat(price) {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
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

  /**
   * Calculate final price or rent
   * @param {Object} customer 
   * @param {Object} carCategory 
   * @param {Number} numberOfDays 
   */
  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer

    const { then: tax } = this.tax.find(t => t.from < age && t.to > age)

    const price = (carCategory.price * tax) * numberOfDays



    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }
}

module.exports = CarService
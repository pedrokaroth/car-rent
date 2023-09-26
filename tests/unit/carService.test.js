const { describe, test } = require('mocha')
const CarService = require('../../src/service/CarService')
const { expect } = require('chai')
const { createSandbox } = require('sinon')

const mocks = {
  carCategory: require('../mocks/valid-car-category'),
  car: require('../mocks/valid-car'),
  customer: require('../mocks/valid-customer')
}

describe('Car service suite test', () => {
  /**
   * @type {CarService}
   */
  let carService = {}

  /**
   * @type {import('sinon').SinonSandbox}
   */
  let sandbox

  before(() => {
    carService = new CarService({ cars: require('../../database/cars') })
  })

  beforeEach(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })



  test('It should return a random position from array', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const response = carService.getRandomPositionFromArray(array)

    expect(response).to.be.lte(array.length).and.gte(0)
  })
  test('It should choosen a random car from car category', () => {
    const carCategory = mocks.carCategory
    const carIndex = 0

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(0)

    const response = carService.choosenRandomCar(carCategory)
    const expected = carCategory.carIds[carIndex]

    expect(response).to.be.eq(expected)
  })
  test('It Should return a available car', async () => {
    const car = mocks.car
    const carCategory = Object.create(mocks.carCategory)

    carCategory.carIds = [car.id]

    const response = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(response).to.be.deep.equal(expected)
  })
  test('Given a car category, customer and numberOfDays it should calculate final amount in real', () => {
    const customer = Object.create(mocks.customer)
    customer.age = 50

    const carCategory = Object.create(mocks.carCategory)
    carCategory.price = 37.6

    const response = carService.calculateFinalPrice(customer, carCategory, 5)
    const expected = carService.moneyFormat(244.40)

    expect(response).to.be.equal(expected)
  })
})
const { describe, test } = require('mocha')
const CarService = require('../../src/service/CarService')
const Transaction = require('../../src/entities/Transaction')
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

  test('Given a car category, customer and numberOfDays, it should return data, the car selected, final price in real, and the dueDate printed in Brazilian portuguese', async () => {
    const customer = Object.create(mocks.customer)
    customer.age = 50

    const carCategory = Object.create(mocks.carCategory)
    carCategory.price = 37.6

    const car = mocks.car

    carCategory.carIds = [car.id]

    const dateTest = new Date(2020, 10, 5)
    sandbox.useFakeTimers(dateTest)

    const numberOfDays = 5

    const dueDate = dateTest.setDate(dateTest.getDate() + numberOfDays)
    const result = await carService.rent(customer, carCategory, numberOfDays)

    const finalPrice = carService.moneyFormat(244.40)
    const formattedDate = carService.dateFormat(dueDate)

    const expected = new Transaction(
      customer,
      car,
      finalPrice,
      formattedDate,
    )

    expect(result).to.be.deep.equal(expected)
  })
})
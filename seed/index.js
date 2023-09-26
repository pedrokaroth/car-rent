const { faker } = require('@faker-js/faker');
const CarCategory = require('../src/entities/CarCategory');
const Costumer = require('../src/entities/Costumer');
const Car = require('../src/entities/Car');
const { writeFile, mkdir } = require('fs/promises');
const { existsSync } = require('fs')
const { join } = require('path');

if (!existsSync('database'))
  mkdir('database')

const carCategory = new CarCategory({
  carIds: [],
  id: faker.string.uuid(),
  name: faker.vehicle.type(),
  price: faker.number.float({ min: 50, max: 100, precision: 0.05 })
})

const cars = []
const costumers = []

for (let x = 0; x < 50; x++) {
  const car = new Car({
    available: true,
    gasAvailable: true,
    id: faker.string.uuid(),
    name: faker.vehicle.model(),
    releaseYear: faker.date.past().getFullYear()
  })

  const costumer = new Costumer({
    id: faker.string.uuid(),
    age: faker.number.int({ min: 18, max: 100 }),
    name: faker.person.fullName()
  })

  carCategory.carIds.push(car.id)

  cars.push(car)
  costumers.push(costumer)
}

const write = async (model, value) => writeFile(join(__dirname, '../', 'database', `${model}.json`), JSON.stringify(value))

  ;

(async () => {
  await Promise.all([
    write('carCategory', carCategory),
    write('cars', cars),
    write('costumers', costumers)
  ])
})()

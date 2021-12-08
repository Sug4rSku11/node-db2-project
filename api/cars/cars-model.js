const db = require('../../data/db-config')

const getAll = async () => {
  return await db('cars')
}

const getById = async id => {
  const [car] = await db('cars').where('id', id)
  return car
}

const create = async car => {
  const [id] = await db('cars').insert(car)
  const newCar = await getById(id)
  return newCar
}

const checkVin = async vin => {
  return await db('cars').where({ vin: `${vin}` }).first()
}

module.exports = {
  getAll,
  getById,
  create,
  checkVin
}
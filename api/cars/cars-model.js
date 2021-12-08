const { get } = require('request')
const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const create = async cars => {
  const [id] = await db('cars').insert(cars)
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}
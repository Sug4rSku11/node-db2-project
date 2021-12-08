const dbConfig = require('../../data/db-config')
const Cars = require('./cars-model')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if(!car){
      res.status(404).json({ 
        message: `car with id ${req.params.id} is not found`})
    } else {
      req.car = car
      next()
    }
  } catch (err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
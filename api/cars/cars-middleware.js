const Cars = require('./cars-model')
const vinValidator = require('vin-validator')


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
  const { vin, make, model, mileage,
         } = req.body;
  function errorItem(item) {
    return res.status(400).json({message: `${item} is missing`})
  }
  if(!vin){
    errorItem("vin")
  } else if (!make) {
    errorItem("make")
  } else if (!model) {
    errorItem("model")
  } else if (!mileage) {
    errorItem("mileage")
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const validated = vinValidator.validate(vin)
  if (validated) {
    next()
  } else {
    res.status(400).json({message: `vin ${vin} is invalid`})
  }
}


const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body
  Cars.checkVin(vin)
    .then(car => {
      if (car) {
      res.status(400).json({message: `vin ${vin} already exists`})
      } else {
        next()
    }
    })
  .catch(next)
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
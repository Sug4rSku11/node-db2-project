const express = require('express')
const knex = require('knex')
const Cars = require('./cars-model')

const router = express.Router()

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
    } = require('../cars/cars-middleware')

router.get('/', (req, res) => {
    Cars.getAll()
    .then(cars => {
        res.json(cars)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(({
            message: 'Failed to retrieve cars'
        }))
    })
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})


module.exports = router

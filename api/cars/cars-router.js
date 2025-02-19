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
const { nextTick } = require('process')


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

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car)
})

router.post('/', checkCarPayload, 
                 checkVinNumberValid, 
                 checkVinNumberUnique, async (req, res, next) => {
                    await Cars.create(req.body)
                    .then(newCar => {
                    res.status(201).json(newCar)
                    })
                .catch(next)
})


module.exports = router

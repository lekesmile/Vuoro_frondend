const express = require('express')
const router = express.Router()
const Workers = require('../models/WorkerSchema')
const authChecker = require('../middleware/authChecker')
require('dotenv').config();

// Get all workers from database
router.get('/api/workers', async (req, res, next) => {

    try {
        const worker = await Workers.find({})
        res.send(worker)
        next()
    } catch (error) {
        return next(new errors.InvalidContentError(error));
    }
})

// Get Single Worker

router.get('/api/workers/:id', async (req, res, next) => {
    try {
        const worker = await Workers.findById(req.params.id);
        console.log(worker)
        res.status(201).send(worker);
        next();
    } catch (error) {
        return   `There is no worker with the id of ${req.params.id} ${error} `
               

    }
});

// Post a new worker into the database

router.post('/api/workers', authChecker, async (req, res, next) => {
    const worker = new Workers({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        department: req.body.department,
        salary: req.body.salary
    })
    try {
        await worker.save();
        res.status(201).send(worker)
        next()
    } catch (error) {
        return next(new errors.InternalError(error.message))
    }
})

// Update a worker in the database

router.put('/api/workers/:id', authChecker, async (req, res, next) => {
    // Check for JSON
    if (!req.is('application/json')) {
        return next(
            new errors.InvalidContentError("Expects 'application/json'")
        );
    }

    try {
        const worker = await Workers.findOneAndUpdate({ _id: req.params.id }, req.body);
        const updatedWorker = await Workers.findOne({ _id: req.params.id })
        res.status(200).send(`Update successfully ${updatedWorker}`);
        next();
    }
    catch (error) {
        return next(
            new errors.ResourceNotFoundError(
                `There is no customer with the id of ${req.params.id}`
            )
        )
    }
})


// Delete a worker from the database

router.delete('/api/workers/:id', authChecker, async (req, res, next) => {

    try {
        const worker = await Workers.findOneAndRemove({ _id: req.params.id });
        console.log({ _id: req.params.id })
        res.status(204).send(`User deleted successfully ${worker}`);
        next();
    } catch (err) {
        return next(
            new errors.ResourceNotFoundError(
                `There is no customer with the id of ${req.params.id}`
            )
        );
    }

})

module.exports = router;


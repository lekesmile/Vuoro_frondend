const express = require('express')
const router = express.Router()
const workers = require('../models/WorkerSchema')



router.get('/api/workers', async (req, res, next) => {

    try {
        const worker = await workers.find({})
        res.send(worker)
        next()
    } catch (error) {
        return next(new errors.InvalidContentError(error));
    }
})

router.post('/api/workers', async (req, res, next) => {
    const worker = new workers({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        department: req.body.department,
        salary: req.body.salary
    })
    try {
        await worker.save();
        res.status(201)
        next()
    } catch (error) {
        return next(new errors.InternalError(error.message))
    }
})

router.put('/api/workers/:id', async (req, res, next) => {
 // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      try {
        const worker = await workers.findOneAndUpdate({ _id: req.params.id },req.body);
        res.status(200).send('Update successfully');
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

router.delete('/api/workers/:id', async (req, res, next) => {

    try {
        await workers.findOneAndRemove({ _id: req.params.id });
        console.log({ _id: req.params.id })
        res.status(204).send('User deleted successfully');
        next();
       } catch (err) {
        return next(
            new errors.ResourceNotFoundError(
                `There is no customer with the id of ${req.params.id}`
            )
        );
    }

})

module.exports= router;


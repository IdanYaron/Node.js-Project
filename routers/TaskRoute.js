const express = require('express');
const Task = require('../model/TaskModel');

const router = express.Router();

router.get('/', (req, res) => {
    Task.find({}).exec((err, tasks) => {
        if (err) console.log(err.message);
        else res.json(tasks);
    })
})

router.post('/add', (req, res) => {
    let newTask = new Task();
    newTask.name = req.body.name;
    newTask.description = req.body.description;
    newTask.isDone = req.body.isDone;
    newTask.priority = req.body.priority;

    newTask.save((err, task) => {
        if (err) {
            res.status(404).send(`Failed saving`);
        }
        else {
            res.status(201).send(`New Task was added successfully`);
        }
    })
})

// PUT - update the priority task:
router.put('/update/:name', (req, res) => {

    Task.findOneAndUpdate(
        { name: req.params.name }, { $set: { priority: req.body.newpriority } },
        (err, updateTask) => {
            if (err) {
                res.status(404).send(`Failed updating task's new priority`);
            }
            else {
                res.status(200).send(`task's priority was updated successfully`);
            }
        }
    )
})

router.delete('/delete/:name', (req, res) => {
    Task.deleteOne({ name: req.params.name }).exec((err, task) => {
        if (err) {
            res.status(404).send(`Failed deleteing task`);

        }
        else {
            res.status(200).json(`task was deleted successfully`);
        }
    })
})

module.exports = router;
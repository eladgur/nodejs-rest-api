const mongoose = require('mongoose'),
    Workout = require('../model/Workout');

function queryTopWorkouts() {
    return Workout
        .find({})
        .sort({
            'score': -1
        })
        .exec();
}

function listAll(req, res) {
    Workout.find({}, function (err, Workouts) {
        if (err) res.send(err);
        res.json(Workouts);
    });
};

function create(req, res) {
    var Workout = new Workout(req.body);
    Workout.save(function (err, Workout) {
        if (err) res.send(err);
        res.json(Workout);
    });
};

function read(req, res) {
    Workout.findById(req.params.id, function (err, Workout) {
        if (err)
            res.send(err);
        res.json(Workout);
    });
};

function update(req, res) {
    Workout.findOneAndUpdate({
        _id: req.body.id
    }, req.body, {
        new: true
    }, function (err, Workout) {
        if (err)
            res.send(err);
        res.json(Workout);
    });
};

function deleteWorkout(req, res) {
    Workout.remove({
        _id: req.params.id
    }, function (err, Workout) {
        if (err)
            res.send(err);
        res.json({
            message: 'Workout successfully deleted'
        });
    });
};

async function topWorkouts(req, res, next) {
    try {
        const topWorkouts = queryTopWorkouts();
        res.json(topWorkouts);
    } catch (err) {
        res.send(err)
    }
}

module.exports = {
    listAll: listAll,
    create: create,
    read: read,
    update: update,
    delete: deleteWorkout,
    topWorkouts: topWorkouts
}
const mongoose = require('mongoose'),
    Trainer = require('../model/Trainer');

function queryTopTrainers() {
    return Trainer
        .find({})
        .sort({
            'score': -1
        })
        .exec();
}

function calcScore(trainer) { // should be timestamp + votes
    let {
        votes,
        date
    } = trainer;
    let currentDate = new Date();
    let diffDays = parseInt((currentDate - date) / (1000 * 60 * 60 * 24), 10);
    let score = votes - diffDays;

    return score;
}

function listAll(req, res) {
    Trainer.find({}, function (err, trainers) {
        if (err) res.send(err);
        res.json(trainers);
    });
};

function create(req, res) {
    var trainer = new Trainer(req.body);
    trainer.save(function (err, trainer) {
        if (err) res.send(err);
        res.json(trainer);
    });
};

function read(req, res) {
    Trainer.findById(req.params.id, function (err, trainer) {
        if (err)
            res.send(err);
        res.json(trainer);
    });
};

function update(req, res) {
    Trainer.findOneAndUpdate({
        _id: req.body.id
    }, req.body, {
        new: true
    }, function (err, trainer) {
        if (err)
            res.send(err);
        res.json(trainer);
    });
};

function deleteTrainer(req, res) {
    Trainer.remove({
        _id: req.params.id
    }, function (err, trainer) {
        if (err)
            res.send(err);
        res.json({
            message: 'Trainer successfully deleted'
        });
    });
};

const VoteType = {
    UP: 'up',
    DOWN: 'down'
}

function updateVotes(req, res, voteType) {
    const id = req.params.id;

    Trainer.findById(id, function (err, trainer) {
        if (err) res.send(err);

        if (voteType === VoteType.UP)
            trainer.likes++
        else
            trainer.likes--
        trainer.score = calcScore(trainer);

        trainer.save(function (err, trainer) {
            if (err) res.send(err);
            res.json(trainer);
        })

    })
}

function upvote(req, res) {
    updateVotes(req, res, VoteType.UP);
}

function downvote(req, res) {
    updateVotes(req, res, VoteType.DOWN);
}

async function topTrainers(req, res, next) {
    try {
        const topTrainers = queryTopTrainers();
        res.json(topTrainers);
    } catch (err) {
        res.send(err)
    }
}

module.exports = {
    listAll: listAll,
    create: create,
    read: read,
    update: update,
    delete: deleteTrainer,
    upvote: upvote,
    downvote: downvote,
    topTrainers: topTrainers
}
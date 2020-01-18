var mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    cache = require('./cache');

function calcScore(post) {
    let {
        votes,
        date
    } = post;
    let currentDate = new Date();
    let diffDays = parseInt((currentDate - date) / (1000 * 60 * 60 * 24), 10);
    let score = votes - diffDays;

    return score;
}

exports.listAll = function (req, res) {
    Post.find({}, function (err, posts) {
        if (err) res.send(err);
        res.json(posts);
    });
};

exports.create = function (req, res) {
    var post = new Post(req.body);
    post.save(function (err, Post) {
        if (err) res.send(err);
        cache.update();
        res.json(Post);
    });
};

exports.read = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.update = function (req, res) {
    Post.findOneAndUpdate({
        _id: req.body.id
    }, req.body, {
        new: true
    }, function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.delete = function (req, res) {
    Post.remove({
        _id: req.params.id
    }, function (err, post) {
        if (err)
            res.send(err);
        res.json({
            message: 'Post successfully deleted'
        });
    });
};

const VoteType = {
    UP: 'up',
    DOWN: 'down'
}

function updateVotes(req, res, voteType) {
    const id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) res.send(err);

        if (voteType === VoteType.UP)
            post.votes++
        else
            post.votes--
        post.score = calcScore(post);

        post.save(function (err, post) {
            if (err) res.send(err);
            cache.update();
            res.json(post);
        })

    });
}

exports.upvote = function (req, res) {
    updateVotes(req, res, VoteType.UP);
};

exports.downvote = function (req, res) {
    updateVotes(req, res, VoteType.DOWN);
};

exports.topPosts = function (req, res) {
    res.json(cache.getTopPosts());
};
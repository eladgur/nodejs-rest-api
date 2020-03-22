var mongoose = require('mongoose'),
    Post = mongoose.model('Posts');

function queryTopPosts() {
    return Post
        .find({})
        .sort({
            'score': -1
        })
        .exec();
}

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

function listAll(req, res) {
    Post.find({}, function (err, posts) {
        if (err) res.send(err);
        res.json(posts);
    });
};

function create(req, res) {
    var post = new Post(req.body);
    post.save(function (err, Post) {
        if (err) res.send(err);
        res.json(Post);
    });
};

function read(req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

function update(req, res) {
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

function deletePost(req, res) {
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
            res.json(post);
        })

    })
}

function upvote(req, res) {
    updateVotes(req, res, VoteType.UP);
}

function downvote(req, res) {
    updateVotes(req, res, VoteType.DOWN);
}

async function topPosts(req, res, next) {
    try {
        const topPosts = queryTopPosts();
        res.json(topPosts);
    } catch (err) {
        res.send(err)
    }
}

module.exports = {
    listAll: listAll,
    create: create,
    read: read,
    update: update,
    delete: deletePost,
    upvote: upvote,
    downvote: downvote,
    topPosts: topPosts
}
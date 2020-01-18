var util = require('./util');

let topPosts = null

exports.update = function () {
    util.queryTopPosts();

    // Post.find({})
    //     .sort({
    //         'score': -1
    //     })
    //     .limit(30)
    //     .exec(function (err, posts) {
    //         if (err) res.send(err);
    //         topPosts = posts;
    //     });
}

exports.getTopPosts = function () {
    if (topPosts === null) {
        util.queryTopPosts()
            .then(posts => topPosts = posts)
    }

    return topPosts;
}
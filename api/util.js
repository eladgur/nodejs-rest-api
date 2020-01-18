var mongoose = require('mongoose'),
    Post = mongoose.model('Posts');

exports.queryTopPosts = function () {
    return Post
        .find({})
        .sort({
            'score': -1
        })
        .limit(30)
        .exec();
}
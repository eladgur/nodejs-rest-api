let mongoose = require('mongoose'),
    Post = mongoose.model('Posts');

let topPosts = null

function queryTopPosts() {
    return Post
        .find({})
        .sort({
            'score': -1
        })
        .limit(30)
        .exec();
}

async function update() {
    topPosts = await queryTopPosts();
}

async function getTopPosts() {
    if (topPosts === null) await update();
    return topPosts;
}

module.exports = {
    update: update,
    getTopPosts: getTopPosts
}
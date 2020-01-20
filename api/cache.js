let mongoose = require('mongoose'),
    Post = mongoose.model('Posts'),
    redisClient = require('../redis-client');

let topPosts = null
let redisKey = 'redisKey'

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
    let topPosts = await queryTopPosts();
    await redisClient.setAsync(redisKey, JSON.stringify(topPosts));

    return topPosts;
}

async function getTopPosts() {
    let rawData = await redisClient.getAsync(redisKey);
    let res;

    if (rawData === null) {
        res = await update();
    } else {
        res = JSON.parse(rawData);
    }

    return res;
}

module.exports = {
    update: update,
    getTopPosts: getTopPosts
}
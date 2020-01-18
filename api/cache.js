var util = require('./util');

let topPosts = null

function update() {
    util.queryTopPosts()
    .then(posts => topPosts = posts)

return topPosts;
}

function getTopPosts() {
    if (topPosts === null) update();
    return topPosts;
}

module.exports = {
    update: update,
    getTopPosts: getTopPosts
}
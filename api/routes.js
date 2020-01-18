function createRoutes(app) {
  var posts = require('./controller');

  app.route('/posts')
    .get(posts.listAll)
    .put(posts.update)
    .post(posts.create);

  app.route('/posts/:id')
    .get(posts.read)
    .delete(posts.delete);

    app.route('/posts/:id/upvote')
    .get(posts.upvote)

    app.route('/posts/:id/downvote')
    .get(posts.downvote)
};

module.exports = createRoutes;
const trainers = require('../controller/trainers');

function createRoutes(app) {
  app.route('/trainers')
    .get(trainers.listAll)
    .put(trainers.update)
    .post(trainers.create);

  app.route('/top-trainers')
    .get(trainers.topTrainers);

  app.route('/trainers/:id')
    .get(trainers.read)
    .delete(trainers.delete);

  app.route('/trainers/:id/upvote')
    .get(trainers.upvote)

  app.route('/trainers/:id/downvote')
    .get(trainers.downvote)
};

module.exports = createRoutes;
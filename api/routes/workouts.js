const workouts = require('../controller/workouts');

function createRoutes(app) {
  app.route('/workouts')
    .get(workouts.listAll)
    .put(workouts.update)
    .post(workouts.create);

  app.route('/top-workouts')
    .get(workouts.topWorkouts);

  app.route('/workouts/:id')
    .get(workouts.read)
    .delete(workouts.delete);
};

module.exports = createRoutes;
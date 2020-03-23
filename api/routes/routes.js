const createWorkoutsRoutes = require('./workouts'),
  createTrainersRoutes = require('./trainers');

function createRoutes(app) {
  createWorkoutsRoutes(app);
  createTrainersRoutes(app);
};

module.exports = createRoutes;
// api/routes/match.js

module.exports = function(app) {
  var controller = app.controllers.match;

  app.param('matchId', controller.getMatch);

  app.route('/api/partidas')
  .get(controller.list)
  .post(controller.create);

  app.route('/api/partidas/:matchId')
  .get(controller.show)
  .put(controller.update)
  .delete(controller.remove);
};

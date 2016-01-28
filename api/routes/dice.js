// api/routes/dice.js

module.exports = function(app) {
  var matchController = app.controllers.match;
  var diceController = app.controllers.dice;

  app.param('matchId', matchController.getMatch);

  app.route('/api/partidas/:matchId/dados')
  .get(diceController.show);

  app.route('/api/partidas/:matchId/dados/rolar')
  .get(diceController.roll);
};

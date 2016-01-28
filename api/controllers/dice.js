// api/controllers/dice.js

module.exports = function(app) {

  /**
  * API do dado
  * @module api
  * @submodule api.dice
  **/

  /**
  * Classe estatica que define metodos de controle do dado.
  *
  * @class Api.Dice.Controller
  * @static
  **/
  var Controller = function() {
    throw new Error('Essa é uma classe estática');
  };

  /**
  * O modelo da Partida.
  *
  * @static
  * @property MODEL
  * @type mongoose.model
  * @final
  **/
  Controller.MODEL = app.models.match;

  /**
  * Rola os dados da partida
  *
  * @static
  * @method roll
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  **/
  Controller.roll = function(req, res) {
    item = {
      dice: [Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1)]
    }
    Controller.MODEL.update({
      _id: req.match._id
    }, item, {}, function(err, updatedMatch) {
      if (err) { return res.status(500).json(err); }
      res.json(item.dice);
    });
  };

  /**
  * Mostra o valor dos dados da partida.
  *
  * @static
  * @method show
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  * @return {String} Objeto JSON com os valores dos dados.
  **/
  Controller.show = function(req, res) {
    res.json(req.match.dice);
  };

  return Controller;
};

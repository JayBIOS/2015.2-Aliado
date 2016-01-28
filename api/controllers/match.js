// api/controllers/match.js

module.exports = function(app) {

  /**
  * API da partida
  * @module api
  * @submodule api.match
  **/

  /**
  * Classe estatica que define metodos de controle da partida.
  *
  * @class Api.Match.Controller
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
  * Middleware que procura no banco a partida que possui o id especificado na requisição.
  *
  * @static
  * @method getMatch
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  * @param {Object} next Proximo middleware
  * @param {String} id Identificação do estabelecimento
  **/
  Controller.getMatch = function(req, res, next, id) {
    Controller.MODEL.findById(id, function(err, match) {
      if (err) { return next(err); }
      if (!match) { return next(
          new Error('Falha ao carregar a partida de id: ' + id)
      ); }
      req.match = match;
      next();
    });
  };

  /**
  * Lista todos as partidas presentes no banco de dados
  *
  * @static
  * @method list
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  * @return {String} Objeto json contendo as partidas
  **/
  Controller.list = function(req, res) {
    Controller.MODEL.find().exec().then(
      function(match) {
        res.json(match);
      }
    , function(err) {
        return res.json(500, err);
      }
    );
  };

  /**
  * Mostra a partida contido na requisição do cliente.
  *
  * @static
  * @method show
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  * @return {String} Objeto json contendo a partida.
  **/
  Controller.show = function(req, res) {
    res.json(req.match);
  };

  /**
  * Cria uma partida nova no banco de dados
  *
  * @static
  * @method create
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  * @return {String} Objeto json contendo o estabelecimento.
  **/
  Controller.create = function(req, res) {
    var match = new Controller.MODEL(req.body);
    match.save(function(err) {
      if (err) { return res.status(500).json(err); }
      res.json(match);
    });
  };

  /**
  * Atualizar uma partida do banco de dados
  *
  * @static
  * @method update
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  * @return {String} Objeto json contendo a partida.
  **/
  Controller.update = function(req, res) {
    Controller.MODEL.update({
      _id: req.match._id
    }, req.body, {}, function(err, updatedMatch) {
      if (err) { return res.status(500).json(err); }
      res.json(updatedMatch);
    });
  };

  /**
  * Remove uma partida do banco de dados
  *
  * @static
  * @method remove
  * @param {Object} req Requisição do cliente
  * @param {Object} res Resposta do servidor
  * @return {String} Objeto json contendo a partida.
  **/
  Controller.remove = function(req, res) {
    var match = req.match;

    match.remove(function(err) {
      if (err) { return res.status(500).json(err); }
      res.json(match);
    });
  };
  return Controller;
};

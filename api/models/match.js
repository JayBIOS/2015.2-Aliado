// api/models/match.js

var mongoose = require('mongoose');

/**
* API da Partida
* @module api
* @submodule api.match
**/

/**
* Classe responsavel pela modelagem da Partida
*
* @class Api.Match.Model
* @constructor
* @return {mongoose.Model} Modelo da partida
**/
var Model = function() {
  /**
  * Schema do modelo da partida.
  *
  * @property schema
  * @type mongoose.Schema
  **/
  this.schema = new mongoose.Schema({
    dice: [{type: Number, max: 6, min:1}]
  });

  return mongoose.model('Match', this.schema);
};

module.exports = Model;

// config/express.js
(function() {
  'use strict';

  var express = require('express')
    , logger = require('morgan')
    , compress = require('compression')
    , compatibility = require('method-override')
    , load = require('express-load')
    , bodyParser = require('body-parser')
    , path = require('path')
  ;

  module.exports = function(publicFolder) {
    var app = express();
    var settings = {
      root: path.resolve(process.cwd(), publicFolder)
      , logFormat: process.env.NODE_ENV ? 'combined' : 'dev'
      , staticOptions: {
        extensions: ['html']
      }
    };

    app
      .use(compress())
      .use(logger(settings.logFormat))
      .use('/', express.static(settings.root, settings.staticOptions))
      .use(bodyParser.urlencoded({extended: true}))
      .use(bodyParser.json())
      .use(compatibility())
    ;

    load('models', {cwd: 'api'})
      .then('controllers')
      .then('routes')
      .into(app)
    ;

    return app;
  };
})();

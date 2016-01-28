// config/mongoose.js
(function() {
  var mongoose = require('mongoose')
  , gutil = require('gulp-util');

  module.exports = function(uri, testing) {
    testing = testing || false;
    mongoose.connect(uri);

    if (!testing) {
      mongoose.connection.on('connected', function() {
        gutil.log('Mongoose!', gutil.colors.green('CONECTADO'), 'em', gutil.colors.magenta(uri));
      });

      mongoose.connection.on('disconnected', function() {
        gutil.log('Mongoose!', gutil.colors.red('DESCONECTADO'), 'em', gutil.colors.magenta(uri));
      });

      mongoose.connection.on('error', function(erro) {
        gutil.log(gutil.colors.red('Mongoose! ERRO na conexão: '), gutil.colors.red(erro));
      });
    }

    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        if (!testing) {
          gutil.log(gutil.colors.yellow('Mongoose! DESCONECTADO pelo término da aplicação'));
        }
        process.exit(0);
      });
    });
  };
})();

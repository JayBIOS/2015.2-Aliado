var config = require('./config/server')
  , app = require('./lib/express')
  , connectToMongo = require('./lib/mongoose')
  , gutil = require('gulp-util')
;

var url = 'http://localhost:' + config.port;

connectToMongo('mongodb://' + config.db.ip + '/' + config.db.name);
var server = app(config.publicFolder).listen(config.port, ready);

process.on('SIGINT', function() {
  server.close(function() {
    process.exit(0);
  });
});

server.on('close', function() {
  gutil.log(gutil.colors.red('Servidor DESCONECTADO!'));
});

function ready() {
  gutil.log('Ligado servidor em ' + gutil.colors.green(url));
}

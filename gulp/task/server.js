// ### Server
// Specify the hostname of your dev server at `manifest.config.devUrl`
// If none is specified, a static file server will be started with the dist directory as root

var browserSync  = require('browser-sync');
var manifest     = require('asset-builder')('./manifest.json')
var paths        = manifest.paths;
var config       = manifest.config || {};

module.exports = function(){
  
  var options      = {};

  if( config.hasOwnProperty('devUrl') ){

    options.proxy = config.devUrl;

  } else {

    options.server = {
      baseDir : paths.dist  
    }

  }

  return browserSync.init( options );

};
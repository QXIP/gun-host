require('babel-register')({
  presets: ['es2015'],
});
require('babel-polyfill');
require('./server/server');


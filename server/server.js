'use strict';

import Hapi from 'hapi';
import config from './config';

import gunRoutes from './routes/gun';

const server = new Hapi.Server({port: config.port, host: config.host});

/**
* Register plugins
*/
async function registerPlugins() {
  await server.register({
    plugin: require('inert'),
  });
}

/**
* Enable server routes
*/
function enableRoutes() {
  [gunRoutes].forEach(function(routes) {
    routes.forEach(function(route) {
      server.route(route);
    });
  });
}

/**
* Star server
*/
async function startServer() {
  enableRoutes();
  await server.start(function(err) {
    if (err) {
      throw err;
    }
    console.log('[gun-host]', `Server running at: ${server.info.uri}`);
  });
}

/**
* Run server
*/
async function run() {
  await registerPlugins();
  await startServer();
}

try {
  run();
} catch (err) {
  console.log('[gun-host]', err);
}

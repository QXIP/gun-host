'use strict';

import Hapi from 'hapi';
import config from './config';
import allRoutes from './routes/routes';

const server = new Hapi.Server({port: config.server.port, host: config.server.host});

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
  [allRoutes].forEach(function(routes) {
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

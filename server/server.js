import Promise from 'bluebird';
import Hapi from 'hapi';
import gun from 'gun';
import {forEach} from 'lodash';
import certificate from './lib/certificate';

import nodeRoutes from './routes/routes';
import config from './config';

/**
* Init HTTPS server
*
* @param {string} host
* @param {string|integer} port
* @param {boolean} debug
* @param {boolean} tls
* @param {object} keys for tls
* @return {object} server instance
*/
async function init(host, port, debug = false, tls = false, keys = null) {
  const options = {port, host};

  if (tls) {
    if (!keys || !keys.serviceKey || !keys.certificate) {
      keys = await certificate.create();
    }
    options.tls = {
      key: keys.serviceKey,
      cert: keys.certificate,
    };
  }

  if (debug) {
    options.debug = {
      log: ['error', 'implementation', 'internal'],
      request: ['error', 'implementation', 'internal'],
    };
  }

  return new Hapi.Server(options);
}

/**
* Register plugins
*
* @param {object} server - hapi instance
*/
async function register(server) {
  await server.register({
    plugin: require('inert'),
  });
}

/**
* Enable server routes
*
* @param {object} server of hapi
*/
function enableRoutes(server) {
  [nodeRoutes].forEach(function(routes) {
    routes.forEach(function(route) {
      server.route(route);
    });
  });
}

/**
* Star server
*
* @param {object} server - hapi instance
*/
async function start(server) {
  enableRoutes(server);
  await server.start(function(err) {
    if (err) {
      throw err;
    }
  });
}

const servers = {};
/**
* Run servers: HTTPS, HTTP and Gun
*
* @return {array} list of anabled servers
*/
async function main() {
  if (config.server.tls) {
    servers.https = await init(config.server.host, config.server.https_port, config.server.debug, config.server.tls, config.server.keys);
  }

  if (config.gun.tls) {
    servers.https_gun = await init(config.gun.host, config.gun.https_port, config.gun.debug, config.gun.tls, config.gun.keys);
    gun({web: servers.https_gun.listener, file: config.gun.local_db});
  }

  servers.http = await init(config.server.host, config.server.http_port, config.server.debug);
  servers.http_gun = await init(config.gun.host, config.gun.http_port, config.gun.debug);
  gun({web: servers.http_gun.listener, file: config.gun.local_db});

  return Promise.each(Object.keys(servers), async function(type) {
    await register(servers[type]);
    await start(servers[type]);
  });
}

main().then(function() {
  forEach(servers, function(server, name) {
    const message = `Started "${server.info.protocol}" (${name}) server on port ${server.info.port}. Available at ${server.info.uri}`;
    console.log(['gun-host'], ['status'], message);
  });
}).catch(function(err) {
  console.error(['gun-host'], ['server'], err);
});

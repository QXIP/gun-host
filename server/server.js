import Promise from 'bluebird';
import Hapi from 'hapi';
import Gun from 'gun';
import {forEach, includes} from 'lodash';
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
* @param {array} routes
*/
function enableRoutes(server, routes) {
  routes.forEach(function(routes) {
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
  // HTTP/HTTPS server
  servers.http = await init(config.server.host, config.server.http_port, config.server.debug);
  if (config.server.tls) {
    servers.https = await init(config.server.host, config.server.https_port, config.server.debug, config.server.tls, config.server.keys);
  }

  const db = {};
  // Gun server
  servers.gun_http = await init(config.gun.host, config.gun.http_port, config.gun.debug);
  db.http = new Gun({web: servers.gun_http.listener, file: config.gun.local_db});
  if (config.gun.tls) {
    servers.gun_https = await init(config.gun.host, config.gun.https_port, config.gun.debug, config.gun.tls, config.gun.keys);
    db.https = new Gun({web: servers.gun_https.listener, file: config.gun.local_db});
  }

  // Start
  return Promise.each(Object.keys(servers), async function(type) {
    await register(servers[type]);
    if (includes(type, 'gun')) {
      await start(servers[type]);
    } else {
      enableRoutes(servers[type], [nodeRoutes]);
      await start(servers[type]);
    }
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

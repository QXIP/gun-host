const gun = require('gun');
const Hapi = require('hapi');
const Promise = require('bluebird');
const certificate = require('./certificate');

/**
* Manage Hapi server to server Gun DB
*/
class Server {
  /**
  * Constructor
  *
  * @param {object} config:
  *        {string} host
  *        {integer} port
  *        {string} cache - file name to store Gun data
  *        {object} cert:
  *               {boolean} selfsigned - certificate
  *               {integer} valid - for n days
  *               {string} key - pem
  *               {string} cert
  */
  constructor(config) {
    this.config = config;
  }

  /**
  * Start Hapi server
  *
  * @param {object} keys of secure con (cert and pem key)
  * @return {string} ack or err
  */
  runHapi(keys) {
    const server = new Hapi.Server();

    server.connection({
      host: this.config.host,
      port: this.config.port,
      tls: {
        key: keys.serviceKey,
        cert: keys.certificate,
      },
    });

    server.connections.forEach((con) => {
      gun({web: con.listener, file: this.config.cache});
    });

    return new Promise(function(resolve, reject) {
      server.start(function(error) {
        if (error) {
          reject(error);
        }
        resolve('gun server started successfully');
      });
    });
  }

  /**
  * Start server
  *
  * @return {string} ack or err
  */
  start() {
    if (this.config.cert.selfsigned) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const keys = certificate.create(this.config.cert.valid);
      return this.runHapi(keys);
    }
    const keys = {
      serviceKey: this.config.cert.key,
      certificate: this.config.cert.cert,
    };
    return this.runHapi(keys);
  }
}

module.exports = Server;

const Server = require('./server');
const GunPromise = require('./gun-promise');

/**
* A class to access Gun DB
*/
class GunHost {
  /**
  * Constructor
  *
  * @param {object} config of cluster
  */
  constructor(config) {
    this.config = config;
    this.host = new GunPromise(this.config.gun.peers, this.config.name); 
  }

  /**
  * Start gun server
  *
  * @return {string} ack or err
  */
  start() {
    const server = new Server(this.config);
    return server.start();
  }

  /**
  * Add node
  *
  * @param {string} path for node
  * @param {object} node to add
  * @return {object} added node
  */
  add(path, node) {
    return this.host.put(path, node);
  };

  /**
  * Get node
  *
  * @param {string} path for node
  * @return {object} node by path
  */
  get(path) {
    return this.host.load(path);
  };

  /**
  * Delete node
  *
  * @param {string} path for node
  * @return {string} ack
  */
  delete(path) {
    return this.host.delete(path);
  };
}

module.exports = GunHost;

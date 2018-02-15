const Server = require('./server');
const GunPromise = require('./gun-promise');

/**
* Serve Gun DB functionality
*/
class GunHost {
  /**
  * Constructor
  *
  * @param {object} config:
  *        {array} peers - list of Gun hosts
  *        {string} rootNodeName - parent for all nodes of this Gun host
  */
  constructor(config) {
    this.host = new GunPromise(config.peers, config.rootNodeName);
  }

  /**
  * Start gun server
  *
  * @param {object} config
  * @return {string} ack or err
  */
  start(config) {
    const server = new Server(config);
    return server.start();
  }

  /**
  * Add node
  *
  * @param {string} path for node
  * @param {object} node to add
  * @return {object} ack
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

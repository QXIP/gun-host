import Node from './node';

/**
* A class to manage this host
*/
class Host {
  /**
  * Constructor
  *
  * @param {object} config
  */
  constructor(config) {
    this.config = config;
    this.cluster = new Node(config.gun.peers, config.gun.name);
  }

  /**
  * Init host
  *
  * @return {object} host node
  */
  init() {
    return this.cluster.put(this.config.host.parent_node + '.' + this.config.host.id, this.config.host);
  }

  /**
  * Display all cluster nodes
  *
  * @return {object} host node
  */
  showClusterNodes() {
    return this.cluster.load(this.config.host.parent_node);
  }

  /**
  * Create new node
  *
  * @param {string} path for node - a or a.b.c
  * @param {object} node
  * @return {object} host node
  */
  addNode(path, node) {
    return this.cluster.put(path, node);
  }

  /**
  * Get node
  *
  * @param {string} path for node - a or a.b.c
  * @return {object} host node
  */
  getNode(path) {
    return this.cluster.load(path);
  }

  /**
  * Delete node
  *
  * @param {string} path for node - a or a.b.c
  * @return {object} null
  */
  deleteNode(path) {
    return this.cluster.delete(path);
  }
}

export default Host;

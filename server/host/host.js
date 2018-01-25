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
    this.nodes = {
      cluster: new Node(config.cluster.peers, config.cluster.name),
    };
  }

  /**
  * Init host
  *
  * @return {object} host node
  */
  async init() {
    return await this.nodes.cluster.put(this.config.host.parent_node + '.' + this.config.host.id, this.config.host);
  }
}

export default Host;

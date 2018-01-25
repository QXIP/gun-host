import Cluster from './cluster';

/**
* Manage queues in cluster
*/
class Queue {
  /**
  * Constructor
  *
  * @param {object} config of cluster
  */
  constructor(config) {
    this.cluster = new Cluster(config);
  }

  /**
  * Create queue
  *
  * @param {string} path for queue - a or a.b.c
  * @return {object} promise ack
  */
  create(path) {
    return this.cluster.put(path);
  }

  /**
  * Delete queue
  *
  * @param {string} path for queue - a or a.b.c
  * @return {object} promise ack
  */
  delete(path) {
    return this.cluster.delete(path);
  }
}

export default Queue;

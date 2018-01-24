import Queue from './queue';
import Task from './task';

/**
* Cluster host
*/
class Host {
  /**
  * Constructor
  *
  * @param {object} config - host config
  */
  constructor(config) {
    this.config = config;
    this.queues = new Queue(config.cluster);
  }

  /**
  * Init host
  *
  * @return {object} promise ack
  */
  async init() {
    await this.queues.create(this.config.cluster.name + '._hosts');
    this.hosts = new Task('_hosts', this.config.cluster);
    return this.hosts.add(this.config.host);
  }

  /**
  * Get all cluster peers
  *
  * @return {array} peers
  */
  peers() {
    return this.hosts.list();
  }

  /**
  * Delete host
  *
  * @param {string|integer} id of host
  * @return {object} ack
  */
  delete(id) {
    return this.hosts.delete(id);
  }

  /**
  * Get host time
  *
  * @return {integer} unix time
  */
  time() {
    return Math.round((new Date()).getTime() / 1000);
  }
}

export default Host;

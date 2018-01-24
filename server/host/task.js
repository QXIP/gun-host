import {filter} from 'lodash';

import Cluster from './cluster';

/**
* Manage tasks in cluster
*/
class Task {
  /**
  * Constructor
  *
  * @param {string} queue name
  * @param {object} config of cluster
  */
  constructor(queue, config) {
    this.queue = queue;
    this.cluster = new Cluster(config);
  }

  /**
  * Get task
  *
  * @param {string|integer} id of task
  * @return {object} task
  */
  get(id) {
    return this.cluster.load(this.queue).then((tasks) => filter(tasks, (t) => t.id === id));
  }

  /**
  * Add task
  *
  * @param {object} task
  * @return {object} promise ack
  */
  add(task) {
    return this.cluster.put(this.queue + '.' + task.id, task);
  }

  /**
  * Delete task
  *
  * @param {string|integer} id of task
  * @return {object} promise ack
  */
  delete(id) {
    return this.cluster.delete(this.queue + '.' + id);
  }

  /**
  * Update task
  *
  * @param {object} task
  * @return {object} promise ack
  */
  update(task) {
    return this.add(task);
  }

  /**
  * List tasks
  *
  * @param {boolean} filterNull - filter 'null' values in the 1st level (Gun bug)
  * @return {array} tasks
  */
  list(filterNull = true) {
    return this.cluster.load(this.queue, filterNull);
  }
}

export default Task;

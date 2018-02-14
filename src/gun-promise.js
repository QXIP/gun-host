const Promise = require('bluebird');
const {forEach} = require('lodash');
const Gun = require('gun');
require('gun/lib/path');
require('gun/lib/load');
require('gun/lib/then');

/**
* Abstract access to Gun DB
*/
class GunPromise {
  /**
  * Constructor
  *
  * @param {object} peers of Gun
  * @param {object} name of the node
  */
  constructor(peers, name) {
    this.name = name;
    this.gun = new Gun({peers});
    this.node = this.gun.get(name);
  }

  /**
  * Get object and all its children
  *
  * @param {string} pathway - a.b.c or a
  * @param {boolean} filterNull - filter 'null' values in the 1st level
  * @return {array} value
  */
  load(pathway, filterNull = true) {
    return this.exists(pathway).then((exists) => {
      if (!exists) {
        return null;
      }
      return new Promise((resolve, reject) => {
        this.node.path(pathway).load(function(object) {
          if (!filterNull) {
            resolve(object);
          }
          const result = {};
          forEach(object, function(value, key) {
            if (value) {
              result[key] = value;
            }
          });
          resolve(result);
        });
      });
    });
  }

  /**
  * Put value
  *
  * @param {string} pathway - a.b.c or a
  * @param {object} value
  * @return {object} new Gun node which contains value properties
  */
  put(pathway, value) {
    return new Promise((resolve, reject) => {
      return this.node.path(pathway).put(value, function(ack) {
        if (ack.error) {
          reject(ack.error);
        }
        resolve(ack);
      });
    });
  }

  /**
  * Check if value exists
  *
  * @param {string} pathway - a.b.c or a
  * @return {boolean}
  */
  exists(pathway) {
    return new Promise((resolve, reject) => {
      this.node.path(pathway).val(function(value) {
        resolve(value ? true : false);
      }); 
    }); 
  }

  /**
  * Get data by path
  *
  * @param {string} pathway - a.b.c or a
  * @return {object} value
  */
  path(pathway) {
    return new Promise((resolve, reject) => {
      this.node.path(pathway).val(function(value) {
        resolve(value);
      });
    });
  }

  /**
  * Delete data
  *
  * @param {string} pathway - a.b.c or a
  * @return {string} message
  */
  delete(pathway) {
    return new Promise((resolve, reject) => {
      // Gun bug, unable to delete a value: https://github.com/amark/gun/issues/456
      // 'null' put here to facilitate filtering deleted values
      this.node.path(pathway).put(null);
      // Gun bug, .put(cb) callback is not resolved if value is null: https://github.com/amark/gun/issues/453
      resolve(null);
    });
  }
}

module.exports = GunPromise;

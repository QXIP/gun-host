const Promise = require('bluebird');
const pem = require('pem');

/**
* Manage certificates
*/
class Certificate {
  /**
  * Create self-signed cert
  *
  * @param {integer} days of validity
  * @param {boolean} selSigned
  * @return {object} keys
  */
  static create(days, selfSigned = true) {
    return new Promise(function(resolve, reject) {
      pem.createCertificate({days, selfSigned}, function(error, keys) {
        if (error) {
          reject(error);
        }
        resolve(keys);
      });
    });
  }
}

module.exports = Certificate;

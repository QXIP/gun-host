import pem from 'pem';
import Promise from 'bluebird';

/**
* Manage certificates
*/
class Certificate {
  /**
  * Create certificate
  *
  * @param {integer} days of validity
  * @param {boolean} selfSigned - self-signed certificate or not
  * @return {object} keys:
  *   {string} serviceKey - pem key
  *   {string} certificate
  */
  static create(days = 1, selfSigned = true) {
    return new Promise(function(resolve, reject) {
      pem.createCertificate({days, selfSigned}, function(error, keys) {
        if (error) reject(error);
        resolve(keys);
      });
    });
  }
}

export default Certificate;

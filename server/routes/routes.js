import Boom from 'boom';
import Host from '../host/host';
import config from '../config';

const host = new Host(config);
host.init().catch(function(err) {
  console.error(['gun-host'], ['host init'], err);
});

/**
* Parse payload into object
*
* @param {object} payload with stringified object as key
* @return {object} payload
* to-do: find out why it is not auto parsed
* https://stackoverflow.com/q/48447993/2393924
*/
function parsePayload(payload) { // to-do: find out why it is not auto parsed
  return JSON.parse(Object.keys(payload)[0]);
}

export default [
  /**
  * Display all cluster nodes
  */
  {
    method: 'GET',
    path: '/',
    handler: function(request, h) {
      return host.showClusterNodes();
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: function(request, h) {
      return host.showClusterNodes();
    },
  },
  /**
  * Create new node
  */
  {
    method: 'POST',
    path: '/node/create',
    handler: function(request, h) {
      const {path, node} = parsePayload(request.payload);
      return host.addNode(path, node);
    },
  },
  /**
  * Get node data
  */
  {
    method: 'POST',
    path: '/node/get',
    handler: function(request, h) {
      const {path} = parsePayload(request.payload);
      return host.getNode(path).then(function(resp) {
        if (!resp) {
          return Boom.notFound('node was not found');
        }
        return resp;
      });
    },
  },
  /**
  * Delete node
  */
  {
    method: 'POST',
    path: '/node/delete',
    handler: function(request, h) {
      const {path} = parsePayload(request.payload);
      return host.deleteNode(path);
    },
  },
];

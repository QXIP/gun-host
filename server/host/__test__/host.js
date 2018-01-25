import {describe, it, after} from 'mocha';
import expect from 'expect.js';
import Host from '../host';
import Gun from 'gun';

/**
* This tests the following object
*
* gun_root: {
*   test_cluster: {
*     hosts: {
*       '123': {
*         id: '123',
*         name: 'trex',
*         parent_node: 'hosts',
*       }
*     }
*   }
* }
*/

const config = {
  gun: {
    peers: [],
    name: 'test_cluster',
  },
  host: {
    id: '123',
    name: 'trex',
    parent_node: 'hosts',
  },
};

const host = new Host(config);
const gun = new Gun({peers: config.gun.peers});

describe('Host', function() {
  after(function() {
    gun.get(config.gun.name).put({});
  });

  it('init', function() {
    return host.init().then(function(node) {
      expect(node.id).to.eql(config.host.id);
    });
  });
});

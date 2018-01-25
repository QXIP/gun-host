import {describe, it, after} from 'mocha';
import expect from 'expect.js';
import Node from '../node';
import Gun from 'gun';

/**
* This tests the following object
*
* gun_root: {
*   test_gun: {
*     hosts: {
*       '123': {
*         id: '123',
*         name: 'trex'
*       }
*     }
*   }
* }
*/

const config = {
  gun: {
    peers: [],
    name: 'test_gun',
  },
  host: {
    id: '123',
    name: 'trex',
    parent_node: 'hosts',
  },
};

const node = new Node(config.gun.peers, config.gun.name);
const gun = new Gun({peers: config.gun.peers});
const host = config.host;

describe('Node', function() {
  after(function() {
    gun.get(config.gun.name).put({});
  });

  it('add new', function() {
    return node.put(host.parent_node + '.' + host.id, host).then(function(ack) {
      expect(ack.id).to.eql(host.id);
    });
  });

  it('exists after add?', function() {
    return node.exists(host.parent_node + '.' + host.id).then(function(exists) {
      expect(exists).to.be(true);
    });
  });

  it('get object', function() {
    return node.path(host.parent_node + '.' + host.id).then(function(o) {
      expect(o.id).to.eql(host.id);
    });
  });

  it('get all properties of object', function() {
    return node.load(host.parent_node).then(function(value) {
      expect(value[host.id]).to.be.an('object');
    });
  });

  it('delete property', function() {
    return node.delete(host.parent_node + '.' + host.id).then(function(ack) {
      expect(ack).to.eql(null);
    });
  });

  it('exists after delete?', function() {
    return node.exists(host.parent_node + '.' + host.id).then(function(exists) {
      expect(exists).to.be(false);
    });
  });
});

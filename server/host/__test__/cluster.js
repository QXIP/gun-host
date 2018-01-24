import {describe, it, before} from 'mocha';
import expect from 'expect.js';
import Cluster from '../cluster';

const cluster = {
  name: 'test_cluster',
};

const hosts = 'hosts';
const host = {
  id: '123',
  name: 'trex',
};

const node = new Cluster(cluster);

describe('Node', function() {
  before(function() {
    node._selfDestruct();
  });

  it('add new', function() {
    return node.put(hosts + '.' + host.id, host).then(function(ack) {
      expect(ack.id).to.eql(host.id);
    });
  });

  it('exists after add?', function() {
    return node.exists(hosts + '.' + host.id).then(function(exists) {
      expect(exists).to.be(true);
    });
  });

  it('get object', function() {
    return node.path(hosts + '.' + host.id).then(function(o) {
      expect(o.id).to.eql(host.id);
    });
  });

  it('get all properties of object', function() {
    return node.load(hosts).then(function(objects) {
      expect(objects.length).to.eql(1);
      expect(objects[0].id).to.eql(host.id);
    });
  });

  it('delete property', function() {
    return node.delete(hosts + '.' + host.id).then(function(ack) {
      expect(ack).to.eql(null);
    });
  });

  it('exists after delete?', function() {
    return node.exists(hosts + '.' + host.id).then(function(exists) {
      expect(exists).to.be(false);
    });
  });
});

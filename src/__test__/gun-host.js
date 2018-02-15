const {describe, it} = require('mocha');
const expect = require('expect.js');

const GunHost = require('../gun-host');

describe('Gun', function() {
  const cluster = {
    enabled: true,
    name: '_test_gun',
    priority_for_master: 0,
    absent_time_for_delete: 86400,
    absent_time: 15,
    loop_delay: 5,
    cert: {
      selfsigned: true,
      valid: 10,
      key: null,
      cert: null,
    },
    gun: {
      port: 9000,
      host: '0.0.0.0',
      cache: 'data.json',
      peers: ['https://localhost:9000/gun'],
    },
    host: {
      id: '123',
      name: 'trex',
      priority: 0,
      node: 'hosts',
    },
  };

  const node = new GunHost({
    peers: cluster.gun.peers,
    rootNodeName: cluster.name,
  });

  it('start server', function() {
    return node.start({
      host: cluster.gun.host,
      port: cluster.gun.port,
      cache: cluster.gun.cache,
      cert: cluster.cert,
    }).then(function(resp) {
      expect(resp).to.eql('gun server started successfully');
    });
  });

  it('add node', function() {
    return node.add(`${cluster.host.node}.${cluster.host.id}`, cluster.host).then(function(resp) {
      expect(resp.err).to.be(null);
      expect(resp.ok).to.be(1);
    });
  });

  it('get node', function() {
    return node.get(`${cluster.host.node}.${cluster.host.id}`).then(function(resp) {
      expect(resp.id).to.be(cluster.host.id);
    });
  });

  it('delete node', function() {
    return node.delete(`${cluster.host.node}.${cluster.host.id}`).then(function(resp) {
      expect(resp.err).to.be(null);
      expect(resp.ok).to.be(1);
    });
  });
});

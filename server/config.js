export default {
  server: { // HTTP/HTTPS server
    port: 7000,
    host: 'localhost',
  },
  cluster: {
    peers: [ // Gun peers
      'https://127.0.0.1:8888/gun',
    ],
    name: 'jurassic', // default Gun node name for all peers
  },
  host: { // default Gun node for this host
    id: '123',
    name: 'trex',
    parent_node: 'hosts',
  },
};

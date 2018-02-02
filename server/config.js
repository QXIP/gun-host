export default {
  server: { // HTTP/HTTPS server
    http_port: 7001,
    https_port: 7000,
    host: '0.0.0.0',
    debug: true,
    tls: true,
    keys: { // TLS keys
      serviceKey: undefined, // pem key
      certificate: undefined,
    },
  },
  gun: {
    name: 'jurassic', // default parent Gun node name for all peers
    peers: [ // Gun peers
      'https://127.0.0.1:8000/gun',
    ],
    port: 8000,
    host: '0.0.0.0',
    debug: true,
    tls: true,
    keys: { // TLS keys
      serviceKey: undefined, // pem key
      certificate: undefined,
    },
    local_db: 'data.json',
  },
  host: { // default Gun node for this host, children of config.gun.name node
    id: '123',
    name: 'trex',
    parent_node: 'hosts',
  },
};

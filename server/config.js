export default {
  server: {
    port: 7000,
    host: 'localhost',
  },
  cluster: {
    peers: [
      'https://127.0.0.1:8888/gun',
    ],
    name: 'jurassic',
  },
  host: {
    id: '123',
    name: 'trex',
    queue: '_hosts',
  },
};

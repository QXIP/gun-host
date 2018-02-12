#gun-host
It is a lib to run [Gun](http://gun.js.org) host in Node.js

1. [Install](#install)
2. [Usage](#usage)

# Install
```
npm install --save https://github.com/QXIP/gun-host
```

# Usage
This example illustrate creating cluster node with name `sentinl` and adding `config.host` as its node under `hosts`.
```
const GunHost = require('../src/gun-host');

const config = {
  enabled: true,
  name: 'sentinl',
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
    host: 'localhost',
    cache: 'data.json',
    peers: ['https://localhost:9000/gun'],
  },
  host: {
    id: '123',
    name: 'velociraptor',
    priority: 0,
    node: 'hosts',
  },
};

const node = new GunHost(config);

const main = async function() {
  try {
    let resp = await node.start();
    console.log('1. Start server:', resp);

    resp = await node.add(`${config.host.node}.${config.host.id}`, config.host);
    console.log('2. Add node:', resp);

    resp = await node.get(config.host.node);
    console.log('3. Get node:', resp);

    resp = await node.delete(`${config.host.node}.${config.host.id}`);
    console.log('4. Delete node:', resp);

    resp = await node.get(config.host.node);
    console.log('5. Check if node exists after removing', resp);
  } catch (err) {
    console.error(err);
  }
};

main();
```

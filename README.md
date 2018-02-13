# gun-host
It is a lib to run [Gun](http://gun.js.org) host in Node.js

1. [Install](#install)
2. [Usage](#usage)

# Install
```
npm install --save https://github.com/QXIP/gun-host
```

# Usage
The example illustrates creating cluster node `sentinl`, adding a child node `hosts`, then adding `config.host` node as a child of `hosts`.

## Init and start host
```
const GunHost = require('gun-host');

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
    host: '0.0.0.0',
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

const node = new GunHost({
  peers: config.gun.peers,
  rootNodeName: config.name,
});

const main = async function() {
  try {
    let resp = await node.start({
      host: config.gun.host,
      port: config.gun.port,
      cache: config.gun.cache,
      cert: config.cert,
    });
    console.log('1. Start server:', resp);

    resp = await node.add(`${config.host.node}.${config.host.id}`, config.host);
    console.log('2. Add node:', resp);

    resp = await node.get(config.host.node);
    console.log('3. Get node:', resp);
  } catch (err) {
    console.error(err);
  }
};

main();
```
Gun holds
```
root: {
  senitnl: {}
}

```
## Add/get data
```
const addData = async function() {
  try {
    resp = await node.add(`${config.host.node}.${config.host.id}`, config.host);
    console.log('2. Add node:', resp);

    resp = await node.get(config.host.node);
    console.log('3. Get node:', resp);
  } catch (err) {
    console.error(err);
  }
};

addData();
```
Gun holds
```
root: {
  setninl: {
    hosts: {
      '123': {
        id: '123',
        name: 'velociraptor',
        priority: 0,
        node: 'hosts',
      }
    }
  }
}
```
## Delete data
```
const delete = async function() {
  try {
    resp = await node.delete(`${config.host.node}.${config.host.id}`);
    console.log('4. Delete node:', resp);

    resp = await node.get(config.host.node);
    console.log('5. Check if node exists after removing', resp);
  } catch (err) {
    console.error(err);
  }
};

delete();
```
Gun holds
```
root: {
  setninl: {
    hosts: {}
  }
}
```

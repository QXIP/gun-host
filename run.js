require('babel-register')({
  presets: ['es2015'],
});

const config = require('./server/config').default;
console.log('--------------');
console.log(config);

const Host = require('./server/host/host').default;
const h = new Host(config);

h.init().then((msg) => {
  console.log(msg);
}).catch(console.error);

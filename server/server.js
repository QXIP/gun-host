'use strict';

import Hapi from 'hapi';
import config from './config';

const server = new Hapi.Server({port: config.port, host: config.host});

server.start(function(err) {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

# gun-host
It is a HTTP/HTTPS host to facilitate usage of [Gun](http://gun.js.org) 

# Run app
All the following instructions are for Linux.
## Install Node.js
Install [NVM](https://github.com/creationix/nvm). Remove existing Node.js if it was not installed via NVM.
1. Go into app directory
```
cd gun-host
```
2. Check the required version
```
cat .node_version 
8.9.4
```
3. Install
```
nvm install 8.9.4
```
4. Switch to the installed version
```
nvm use 8.9.4
``` 
## Config host
To config the host, edit properties in `server/config.js`.

## Run host
```
npm start
```

# Usage
## Create node
```
curl -H "Content-Type: application/json" -d '{"path": "dinos.456", "node": {"name": "velociraptor", "speed": 50, "force": 20}}' -X POST http://localhost:7001/node/create 

{"_":{"#":"jcuri9qkWxVJXvqCZpTZ",">":{"name":1516901686580.001,"speed":1516901686580.001,"force":1516901686580.001}},"name":"velociraptor","speed":50,"force":20}
```
## Get node
```
curl -H "Content-Type: application/json" -d '{"path": "dinos.456"}' -X POST http://localhost:7001/node/get

{"name":"velociraptor","speed":50,"force":20}
```
```
curl -H "Content-Type: application/json" -d '{"path": "dinos"}' -X POST http://localhost:7001/node/get

{"456":{"name":"velociraptor","speed":50,"force":20}}
```
## Delete node
```
curl -H "Content-Type: application/json" -d '{"path": "dinos.456"}' -X POST http://localhost:7001/node/delete
```

# Development
## Install dev tools
```
npm install -g eslint eslint-babel nodemon eslint-config-google
```
## Test
```
npm run test
```

# Docker
## Create image
```
docker build -t <your username>/gun-host .

```
## Run container
```
udo docker run -p 0.0.0.0::7000 -p 0.0.0.0::7001 -p 0.0.0.0::8000 -p 0.0.0.0::8001 -d sergibondarenko/gun-host
```
## Test
### Show the running container process, binded network ports, status etc.
```
docker ps
```
### Show logs
```
docker logs <container id>
```
## Enter the container
```
docker exec -it <container id> /bin/bash
```

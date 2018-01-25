# gun-host
It is a HTTP/HTTPS host to facilitate usage of [Gun](http://gun.js.org) 

# Usage
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

# Development

## Install dev tools
```
npm install -g eslint eslint-babel nodemon eslint-config-google
```

## Run
```
npm run dev
```

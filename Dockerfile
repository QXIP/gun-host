# Latest LTS
FROM node:carbon

# App directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . .

# Bind network ports
EXPOSE 7001 7000

# Cmd to run app
CMD [ "npm", "start" ]

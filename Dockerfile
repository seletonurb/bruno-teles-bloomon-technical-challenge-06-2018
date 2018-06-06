FROM node:carbon

# Create app directory
WORKDIR /app

# Bundle app source
COPY . /app

# start server command
CMD [ "npm", "start" ]

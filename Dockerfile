# Check out https://hub.docker.com/r/pixelpointltd/gatsby-docker to select a new base image
FROM node:14.13.1-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Bundle app source code
COPY --chown=node . .

RUN npm install

CMD [ "npm", "run", "develop"]
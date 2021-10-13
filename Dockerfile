FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install && mv /usr/src/app/node_modules /node_modules
RUN npm install -g nodemon && npm install bower -g && npm install gulp -g


# Bundle app source
COPY . ./code

# Exports
EXPOSE 3000
CMD ["npm", "run", "start"]


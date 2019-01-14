FROM mhart/alpine-node:10

# Switch to directory with sources
WORKDIR /usr/src/app
ADD . /usr/src/app/

# Copy package json and install dependencies
COPY package.json package-lock.json ./

# Install (local) NPM packages/dependencies
RUN npm install
RUN npm run prod:build

# Copy required stuff
COPY . .

# Expose SERVER ports
EXPOSE 8080

# Specify default CMD
CMD ["npm", "run", "prod:start"]

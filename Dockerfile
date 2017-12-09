FROM mhart/alpine-node:8

# Switch to directory with sources
WORKDIR /usr/src/app
ADD . /usr/src/app/

# Copy package json and install dependencies
COPY package.json yarn.lock ./

# Install (local) NPM packages/dependencies
RUN yarn

# Copy required stuff
COPY . .

# Expose SERVER ports
EXPOSE 8080

# Specify default CMD
CMD ["npm", "run", "prod"]

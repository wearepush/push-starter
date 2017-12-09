FROM mhart/alpine-node:8

# Switch to directory with sources
WORKDIR /src
ADD . /src/

# Copy package json and install dependencies
COPY package.json yarn.lock ./

# Install (local) NPM packages/dependencies
RUN yarn

# Copy required stuff
ADD . .

# Expose SERVER ports
EXPOSE 8080

# Specify default CMD
CMD ["npm", "run", "prod"]

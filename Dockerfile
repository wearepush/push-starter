FROM mhart/alpine-node:16

# Switch to directory with sources
WORKDIR /usr/src/app
ADD . /usr/src/app/

# Copy package json and install dependencies
COPY package.json package-lock.json ./

# Install (local) NPM packages/dependencies
RUN npm install
RUN npm run production:build

# Copy required stuff
COPY . .

# Expose SERVER ports
EXPOSE 8080

# Specify default CMD
CMD ["npm", "run", "production:services"]

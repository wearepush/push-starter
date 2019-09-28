# React Redux Styled Hot Universal
React boilerplate, used best practices and focus on performance

[![Build Status](https://travis-ci.org/wearepush/push-starter.svg?branch=master&style=flat-square)](https://travis-ci.org/wearepush/push-starter)
[![Dependency Status](https://david-dm.org/wearepush/push-starter.svg?style=flat-square)](https://david-dm.org/wearepush/push-starter)
[![devDependency Status](https://david-dm.org/wearepush/push-starter/dev-status.svg?style=flat-square)](https://david-dm.org/wearepush/push-starter?type=dev)
---

---


## [Live Demo](https://wearepush-redux-starter.herokuapp.com) :eyes:

## About

The starter boilerplate includes the following technologies:

| Technology                                                                                                                                                                                                                  | Description                                                     |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| [Node 10.15.1 LTS](https://nodejs.org/en/)                                        | Node |
| [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension)         | Redux Dev Tools |
| [React Hot Loader 4](https://github.com/gaearon/react-hot-loader)                 | Tweak React components in real time |
| [React 16](https://github.com/facebook/react)                                     | JavaScript library for building user interfaces  |
| [React Router 4](https://github.com/ReactTraining/react-router)                   | React Router is a complete routing library for React    |
| [Babel](http://babeljs.io)                                                        | Babel is a JavaScript compiler              |
| [Webpack 4](http://webpack.github.io)                                             | Module bundler                       |
| [Universal Webpack](https://www.npmjs.com/package/universal-webpack)              | Helps setting up universal Webpack build: the one that's working both on client and server                                                |
| [Redux](http://redux.js.org/)                                                     | Redux is a predictable state container for JavaScript apps                           |
| [React Router Redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)               | Simple bindings to keep react-router and redux in sync                                        |
| [ESLint](http://eslint.org)                                                       | The pluggable linting utility for JavaScript and JSX                                            |

## Installation

```bash
rm -rf node_modules
npm install
```

## Create dev environment
```bash
mv .env.example .env
```

## Running Dev Server

```bash
npm run dev
```

## Create production environment
```bash
mv .env.production.example .env.production
```

## Running Prod Server

```bash
npm run prod
```

## Running Tests

```bash
npm run test
```

## Deployment on Heroku

To get this project to work on Heroku, you need to:

1. Add heroku `heroku git:remote -a heroku-app-name`
2. `heroku config:set NODE_ENV=production`
3. `heroku config:set SSR=1`
4. `heroku config:set SSL=1`
5. `heroku config:set NPM_CONFIG_PRODUCTION=false`
6. `heroku config:set NODE_MODULES_CACHE=false`
7. `heroku config:set GOOGLE_ANALITICS_ID=UA-xxxxxxxxx-x` (optional)

## Docker

Run container

```bash
docker-compose up -d
```

Build an image

```bash
docker build -t wearepush/redux-starter .
```

## Contributing

We are more than happy to accept external contributions to the project in the form of feedback, bug reports and even better - pull requests :)
If you would like to submit a pull request, please make an effort to follow the guide in [CONTRIBUTING.md](docs/CONTRIBUTING.md).

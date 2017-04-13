# React Redux Universal Hot Example

[![Build Status](https://travis-ci.org/wearepush/redux-starter.svg?branch=master&style=flat-square)](https://travis-ci.org/wearepush/redux-starter)
[![Dependency Status](https://david-dm.org/wearepush/redux-starter.svg?style=flat-square)](https://david-dm.org/wearepush/redux-starter)
[![Demo on Heroku](https://img.shields.io/badge/demo-heroku-brightgreen.svg?style=flat-square)](https://wearepush-redux-starter.herokuapp.com/)

## Installation

```bash
npm install
```

## Dev Server

```bash
npm run dev
```

## Prod Server

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Deployment on Heroku

0. Add heroku `heroku git:remote -a wearepush-redux-starter`

To get this project to work on Heroku, you need to:

1. Remove the `"PORT": 8080` line from the `betterScripts` / `start-prod` section of `package.json`.
2. `heroku config:set NODE_ENV=production`
3. `heroku config:set NODE_PATH=./src`
4. `heroku config:set NPM_CONFIG_PRODUCTION=false`
5. `heroku config:set NODE_MODULES_CACHE=false`
  * This is to enable webpack to run the build on deploy.

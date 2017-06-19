# STRUCTURE

Pages folder
```
└── pages
| └── PageName
| | | index.js
| | └── components
| | |  |
| | |  ...
| | └── containers
| | |  |
| |  ...
|
...
```

* index.js - [entry react router point](https://github.com/ReactTraining/react-router/blob/v3/docs/guides/DynamicRouting.md)

Components folder
```
└── components
│  index.js
│  └── ComponentName
│  │  │  ComponentName.js
│  │  │  ComponentName.scss
│  │  │  ComponentName.test.js
│  │  │  ...
|  |
|  ...
...
```

Elements folder
```
└── elements
│  index.js
│  └── ElementName
│  │  │  ElementName.js
│  │  │  ElementName.scss
│  │  │  ElementName.test.js
│  │  │  ...
|  |
|  ...
...
```

Config folder
```
...
└── config
│  │  index.js
│  │  environment.js
│  │  default.js
|  ...
```

* index.js - result of merge common and environment variables
* environment.js - variables base on environment development / production
* default.js -common variables

Redux folder
```
...
└── redux
│  │  index.js
│  └── middleware
|  |  | clientMiddleware.js
│  └── modules
|  |  | moduleName.js
|  |  ...
|  |
│  │  reducer.js
│  │  routing.js
│  │  store.js
|  ...
```

* clientMiddleware.js - [redux middleware](http://redux.js.org/docs/advanced/Middleware.html)
* reducer.js - [redux reducer](http://redux.js.org/docs/basics/Reducers.html) [redux immutable](https://github.com/indexiatech/redux-immutablejs)
* moduleName.js - [example reducer](http://redux.js.org/docs/recipes/StructuringReducers.html)
* routing.js - [redux router](https://github.com/reactjs/react-router-redux)
* store.js - [redux store](http://redux.js.org/docs/api/Store.html)


Routes
```
...
| routes.js - index point for routes
|  ...
```

* [router](https://github.com/ReactTraining/react-router/tree/v3/docs)
* [dynamic routing](https://github.com/ReactTraining/react-router/blob/v3/docs/guides/DynamicRouting.md)

Helpers
```
...
└── helpers
|  ApiClient.js
|  ...
```

* ApiClient.js - [superagent](https://github.com/visionmedia/superagent)

Client
```
...
└── client
| | root.js
| | index.js
|  ...
```

* root.js - [redux provider](http://redux.js.org/docs/advanced/UsageWithReactRouter.html)
* index.js - application entry point

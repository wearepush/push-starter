# STRUCTURE

Routes folder
```
└── routes
| └── PageName
| | | PageName.js
| | | PageName.scss
| | | PageName.test.js
|...└──...
| index.js - index point for routes
...
```

* index.js - [entry react router point](https://github.com/ReactTraining/react-router/blob/v3/docs/guides/DynamicRouting.md)
* [router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router)

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
│  │  store.js
|  ...
```

* clientMiddleware.js - [redux middleware](http://redux.js.org/docs/advanced/Middleware.html)
* reducer.js - [redux reducer](http://redux.js.org/docs/basics/Reducers.html) [redux immutable](https://github.com/indexiatech/redux-immutablejs)
* moduleName.js - [example reducer](http://redux.js.org/docs/recipes/StructuringReducers.html)
* store.js - [redux store](http://redux.js.org/docs/api/Store.html)


Helpers
```
...
└── helpers
|  ApiClient.js
|  ...
```

* ApiClient.js - [axios](https://github.com/axios/axios)

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

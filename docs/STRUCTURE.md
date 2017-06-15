# STRUCTURE

Pages folder
```
└── pages
| └── PageName
| | | index.js - route
| | └── components
| | |  |
| | |  ...
| | └── containers
| | |  |
| |  ...
|
...
```

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

Routes
```
...
| routes.js - index point for routes
|  ...
```

Helpers
```
...
└── helpers
|  ...
```

Client
```
...
└── client
| | root.js - entry point for application
| | index.js - entry point for routes
| | html.js - entry point for html
|  ...
```

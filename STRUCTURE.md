# STRUCTURE

Pages folder

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

Common folder

└── common
| └── components
| |  |
| |  ...
| └── containers
| |  |
| |  ...
|
...


Components folder for Common and Pages

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

Containers folder  for Common and Pages

└── containers
│  index.js
│  └── ContainerName
│  │  │  ContainerName.js
│  │  │  ContainerName.scss
│  │  │  ContainerName.test.js
│  │  │  ...
|  |
|  ...
...


Config folder

...
└── config
│  │  index.js
│  │  environment.js
│  │  default.js
|  ...

Redux folder

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


Routes

...
| routes.js - index point for routes
|  ...


Helpers

...
└── helpers
|  ...

Client

...
└── client
| | root.js - entry point for application
| | index.js - entry point for routes
| | html.js - entry point for html
|  ...

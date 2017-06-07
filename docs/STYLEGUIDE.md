Images

Now it's possible to render the image both on client and server.

const logoImage = require('./logo.png');
<img src={logoImage} alt="logoImage" />

Styles

This project uses local styles using css-loader.

import styles from './Style.scss';
...
Then you set the className of your element to match one of the CSS classes in your SCSS file!

<div className={styles.mySection}> ... </div>
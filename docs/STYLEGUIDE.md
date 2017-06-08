## Images

Now it's possible to render the image both on client and server.

```bash
const logoImage = require('./logo.png');
```

## Styles

This project uses local styles using css-loader.

```bash
import styles from './Style.scss';
```


Then you set the className of your element to match one of the CSS classes in your SCSS file!

```bash
<div className={styles.mySection}> ... </div>
```
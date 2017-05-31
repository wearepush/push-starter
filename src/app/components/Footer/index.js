import React, { PureComponent } from 'react';

export default class Footer extends PureComponent {
  render() {
    const githubUrl = 'https://github.com/krasevych/english-school';

    return (
      <div>
        <span>Have questions? Contact with me for help on </span>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
      </div>
    );
  }
}

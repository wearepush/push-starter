import React from 'react';
import { Helmet } from 'react-helmet';
import { Checkbox, Radio } from '../../elements';

const UI = () => {
  const title = 'Redux Starter. UI';
  const description = 'React. UI';
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div>This is example of ui library</div>
      <div>
        <h2>Checkbox</h2>
        <Checkbox
          name="checkbox-0"
          placeholder="Checkbox placeholder"
        />
        <h2>Checkbox with custom render</h2>
        <Checkbox
          name="checkbox-1"
          placeholder="Checkbox placeholder"
          custom
        />
        <h2>Checkbox with custom icons</h2>
        <Checkbox
          name="checkbox-2"
          placeholder="Checkbox placeholder"
          custom
          checkedIcon={<span>checked</span>}
          unCheckedIcon={<span>unchecked</span>}
        />
        <h2>{'Checkbox\'s API'}</h2>
        <Checkbox
          name="checkbox-3"
          placeholder="Checkbox placeholder"
          onChange={(e, checked) => {
            console.log('onChange', checked);
          }}
          onFocus={(e, checked) => {
            console.log('onFocus', checked);
          }}
          onBlur={(e, checked) => {
            console.log('onBlur', checked);
          }}
        />
        <h2>Radio</h2>
        <Radio
          name="radio-0"
          placeholder="Radio placeholder 0"
          value={{
            test: true
          }}
        />
        <Radio
          name="radio-0"
          placeholder="Radio placeholder 1"
          value={{
            test2: true
          }}
        />
        <h2>Radio with custom render</h2>
        <Radio
          name="radio-1"
          placeholder="Radio placeholder 2"
          custom
          value="1"
        />
        <Radio
          name="radio-1"
          placeholder="Radio placeholder 3"
          custom
          value="2"
        />
      </div>
    </div>
  );
};

export default UI;

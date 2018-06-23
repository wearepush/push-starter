import React from 'react';
import { Helmet } from 'react-helmet';
import { Checkbox, Button, Radio, TextField, Dropdown } from '../../elements';

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
      <h1>This is example of ui library</h1>
      <hr />
      <h2>Button</h2>
      <Button>
        Button
      </Button>
      <Button
        disabled
        onClick={() => { console.log('!!!!!!'); }}
      >
        Disabled Button
      </Button>
      <Button
        fullWidth
      >
        Full Width Button
      </Button>
      <Button
        size="small"
      >
        Small Button
      </Button>
      <Button
        size="medium"
      >
        Medium Button
      </Button>
      <Button
        size="large"
      >
        Large Button
      </Button>
      <Button
        className="custom-class"
      >
        Custom Classname Button
      </Button>
      <Button component="a">
        test
      </Button>
      <hr />
      <h2>TextField</h2>
      <TextField
        name="textfield-0"
        placeholder="TextField placeholder 0"
        type="text"
      />
      <h2>{'TextField\'s API'}</h2>
      <TextField
        name="textfield-1"
        placeholder="TextField placeholder"
        onChange={(e, value) => {
          console.log('onChange', value);
        }}
        onFocus={(e, value) => {
          console.log('onFocus', value);
        }}
        onBlur={(e, value) => {
          console.log('onBlur', value);
        }}
      />
      <hr />
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
        <hr />
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
        <h2>Radio with custom icons</h2>
        <Radio
          name="radio-2"
          placeholder="Radio placeholder 2"
          custom
          checkedIcon={<span>checked</span>}
          unCheckedIcon={<span>unchecked</span>}
          value="1"
        />
        <Radio
          name="radio-2"
          placeholder="Radio placeholder 3"
          custom
          checkedIcon={<span>checked</span>}
          unCheckedIcon={<span>unchecked</span>}
          value="2"
        />
        <h2>{'Radio\'s API'}</h2>
        <Radio
          name="radio-3"
          placeholder="Radio placeholder"
          onChange={(e, value) => {
            console.log('onChange', value);
          }}
          onFocus={(e, value) => {
            console.log('onFocus', value);
          }}
          onBlur={(e, value) => {
            console.log('onBlur', value);
          }}
          value="1"
        />
      </div>
      <h2>Dropdown uncontroled</h2>
      <Dropdown
        triggerClassName="my-trigger"
        dropMenuClassName="my-drop"
        trigger={<span>Uncontroled</span>}
      >
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Dropdown>
      <h2>Dropdown controled</h2>
      <Dropdown
        isOpen={true} // eslint-disable-line
        trigger={<span>Controled</span>}
      >
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Dropdown>
    </div>
  );
};

export default UI;

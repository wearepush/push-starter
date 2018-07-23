import React from 'react';
import { Helmet } from 'react-helmet';
import { Checkbox, Button, Radio, TextField, TextArea, Dropdown } from '../../elements';

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
      <Button
        color="primary"
      >
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
        color="danger"
      >
        Full Width Button
      </Button>
      <Button
        size="small"
        color="success"
      >
        Small Button
      </Button>
      <Button
        size="small"
        color="alert"
      >
        Small Button
      </Button>
      <Button
        size="medium"
      >
        Medium Button
      </Button>
      <Button
        variant="outlined"
      >
        Outlined Button
      </Button>
      <Button
        variant="outlined"
        color="alert"
      >
        Outlined Button
      </Button>
      <Button
        float
      >
        Floating Button
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
      <Button
        component="a"
        variant="outlined"
      >
        Link
      </Button>
      <hr />
      <h2>TextField</h2>
      <TextField
        name="textfield-0"
        placeholder="TextField placeholder 0"
        type="text"
      />
      <h2>Disabled TextField</h2>
      <TextField
        disabled
        name="textfield-0"
        placeholder="Input disabled"
        type="text"
      />
      <h2>Valid TextField</h2>
      <TextField
        defaultValue="Placeholder"
        name="textfield-0"
        placeholder="TextField placeholder 0"
        type="text"
        valid
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
      <h2>TextArea</h2>
      <TextArea
        name="textarea-0"
        placeholder="Textarea placeholder 0"
      />
      <h2>Disabled TextArea</h2>
      <TextArea
        disabled
        name="textarea-1"
        placeholder="Textarea disabled"
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
        <h2>Checkbox with disabled custom render</h2>
        <Checkbox
          disabled
          name="checkbox-3"
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
          name="checkbox-5"
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
        <Radio
          name="radio-1"
          placeholder="Radio placeholder 3"
          custom
          disabled
          value="3"
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
      <h2>Dropdown controled</h2>
      <Dropdown
        dropPosition="bl"
        button="My Settings"
      >
        <span>1</span>
      </Dropdown>
    </div>
  );
};

export default UI;

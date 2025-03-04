import React from 'react';

export const Demo1 = () => (
  <div className="demo">
    <form>
      <label htmlFor="text">Text:</label>
      <input type="text" name="text" />
      <button>Send</button>
    </form>
  </div>
);

export class Demo2 extends React.Component {
  state = { number: 1, text: 'initial', checked: true };

  render() {
    const { number, text, checked } = this.state;
    return (
      <div className="demo">
        <form action="">
          <div>
            <label htmlFor="number">Number</label>
            <input
              type="number"
              name="number"
              value={number}
              onChange={this.handleNumericChanged}
            />
          </div>
          <div>
            <label htmlFor="text">Text</label>
            <input
              type="text"
              name="text"
              value={text}
              onChange={this.handleValueChanged}
            />
          </div>
          <div>
            <label htmlFor="checked">Checkbox</label>
            <input
              type="checkbox"
              name="checked"
              checked={checked}
              onChange={this.handleCheckedChanged}
            />
          </div>
        </form>
      </div>
    );
  }

  handleValueChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckedChanged = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleNumericChanged = e => {
    this.setState({ [e.target.name]: parseInt(e.target.value) });
  };
}

const Demo3Form = ({ number, text, checked, onChange }) => (
  <div className="demo">
    <form action="">
      <div>
        <label htmlFor="number">Number</label>
        <input type="number" name="number" value={number} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="text">Text</label>
        <input type="text" name="text" value={text} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="checked">Checkbox</label>
        <input
          type="checkbox"
          name="checked"
          checked={checked}
          onChange={onChange}
        />
      </div>
    </form>
  </div>
);

const handleChange = e => {
  switch (e.target.type) {
    case 'text':
      return { [e.target.name]: e.target.value };

    case 'checkbox':
      return { [e.target.name]: e.target.checked };

    case 'number':
      return { [e.target.name]: parseInt(e.target.value) };
  }

  return {};
};

export class Demo3 extends React.Component {
  state = { number: 1, text: 'initial', checked: true };

  render() {
    return (
      <Demo3Form
        {...this.state}
        onChange={e => this.setState(handleChange(e))}
      />
    );
  }
}

const Demos = ({ id }) => {
  switch (id) {
    case '1':
      return <Demo1 />;
    case '2':
      return <Demo2 />;
    case '3':
      return <Demo3 />;
  }

  return <div>Invalid id {id}</div>;
};

export default Demos;

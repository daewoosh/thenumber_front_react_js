import React from 'react';
import { PropTypes } from 'prop-types';
import { action, reaction } from 'mobx';
import { observer } from 'mobx-react';

/** сomponent может быть любым элементов  поддерживающим интерфейс
 * onChange метод который вызывется когда в компонените произошло изменение значения
   value - передача в компонент значения 
   error - передача в компонент ошибки
  */

@observer
class BSMobxField extends React.Component {
  constructor(props) {
    super(props);
    if (!props.Component
      || typeof (Component) === 'function') {
      throw new Error('Component: Не определено поле Component');
    }
    this.type = props.type || 'text';
    if (!props.name) {
      throw new Error('BSField: Не определено поле name');
    }
    this.name = props.name;
    if (!props.formApi) {
      throw new Error('BSField: Не определен formApi');
    }
    this.formApi = props.formApi;
    const fieldValue = this.formApi.data[this.name];
    if (fieldValue === undefined) {
      throw new Error(`BSField: Не определено поле ${this.name} в formApi`);
    }
    if (this.formApi.formData
      && this.formApi.formData[this.name]) {
      this.maxLength = this.formApi.formData[this.name].maxLength;
    }
  }

  @action
  _setValue = (value) => {
    debugger;
    this.formApi.data[this.name] = value;
  }

  onChange = (newValue) => {
    this._setValue(newValue);
  }


  render() {
    debugger;
    const { Component, type, formApi, ...props } = this.props;
    const value = formApi.data[this.name];
    // const error = formApi.errors[this.name];
    return (
      <Component
        onChange={this.onChange}
        value={value}
        // error={error}
        maxLength={this.maxLength}
        {...props}
      />
    );
  }
}

BSMobxField.propTypes = {
  component: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  formApi: PropTypes.shape({}),
};

export default BSMobxField;

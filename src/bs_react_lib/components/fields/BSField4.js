import { getValidators, getValidatorData } from 'services/ValidationService';

import React from 'react';
import { PropTypes } from 'prop-types';
import { action, reaction } from 'mobx';
import { observer } from 'mobx-react';

import FormInputField from './FormInputField3';

@observer
class BSField extends React.Component {
  constructor(props) {
    super(props);
    this.validators = getValidators(props.bsType, props.required);
    this.validatorData = getValidatorData(props.bsType);
    this.maxLength = this.validatorData ? this.validatorData.maxLength : undefined;
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
    } else {
      this._setValue(fieldValue);
    }
    reaction(
      () => this.formApi.data[this.name],
      value => this._setValue(value),
    );
    // this._setValue(this.formApi[this.name].get());
  }

  @action
  _setValue =(value) => {
    const error = this.validate(value);
    this.formApi.data[this.name]= value;
    this.formApi.errors[this.name] = error;
  }

  onChange = (newValue) => {
    this._setValue( newValue);
  }

  validate = (value) => {
    if (this.type === 'text') {
      if (this.validators && this.validators.length > 0) {
        for (let i = 0; i < this.validators.length; i += 1) {
          const er = this.validators[i](value);
          if (er) {
            return er;
          }
        }
      }
    }
    return '';
  }

  render() {
    // const maxLength = this.validatorData ? this.validatorData.maxLength : undefined;

    return (
      <FormInputField
        type={this.type}
        onChange={this.onChange}
        value={this.formApi.data[this.name]}
        maxLength={this.maxLength}
        error={this.formApi.errors[this.name]}
        {...this.props}
      />
    );
  }
}

BSField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  bsType: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.arrayOf(PropTypes.func),
  formApi: PropTypes.shape({}),
};

export default BSField;

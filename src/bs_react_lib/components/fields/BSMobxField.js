import { getValidatorData } from 'services/ValidationService';

import React from 'react';
import { PropTypes } from 'prop-types';
import { action, reaction } from 'mobx';
import { observer } from 'mobx-react';

import { TextField, Checkbox, SelectField } from 'material-ui';

import DatePicker from 'react-datepicker';
import DatePickerInput from './DatePickerInput';

const getTextTemplate = ({ props, value, onChange, error, maxLength, type }) => {
  const handleOnChange = (event, value) => onChange(value);
  return (
    <TextField
      className={props.className || ''}
      hintText={props.label}
      errorText={!!error && error}
      multiLine={props.multiLine || false}
      rows={props.rows || 1}
      disabled={props.disabled || false}
      onChange={handleOnChange}
      value={value}
      floatingLabelText={props.floatingLabelText || ''}
      maxLength={maxLength}
      type={type}
      {...props}
    />
  );
};


const getCheckboxTemplate = ({ props, value, onChange, error }) => {
  const handleOnCheck = (event, value) => onChange(value);
  const result = (
    <Checkbox
      className={props.className || ''}
      checked={!!value}
      onCheck={handleOnCheck}
      disabled={props.disabled || false}
      {...props}
    />
  );
  return result;
};

const getSelectFieldTemplate = ({ props, value, onChange, error }) => {
  const handleSelectChange = (event, index, value) => onChange(value);
  const result = (
    <SelectField
      className={props.className || ''}
      floatingLabelText={props.label || ''}
      errorText={!!error && error}
      onChange={handleSelectChange}
      disabled={props.disabled || false}
      value={value}
      {...props}
    >
      {props.children}
    </SelectField>
  );
  return result;
};

const getDatePickerTemplate = ({ props, value, onChange, error, type }) => {
  const result = (
    <DatePicker
      className={props.className || 'datepicker'}
      customInput={<DatePickerInput />}
      placeholderText={props.label}
      floatingLabelText={props.floatingLabelText || ''}
      dateFormat={props.dateFormat || 'DD.MM.YYYY'}
      selectsStart={props.selectsStart || true}
      withPortal={props.withPortal || true}
      showYearDropdown={props.showYearDropdown || true}
      showMonthDropdown={props.showMonthDropdown || true}
      dropdownMode={props.dropdownMode || 'select'}
      selected={value}
      onChange={onChange}
      {...props}
    />
  );
  return result;
};

/** сomponent может быть любым элементов  поддерживающим интерфейс
 * onChange метод который вызывется когда в компонените произошло изменение значения
   value - передача в компонент значения 
   error - передача в компонент ошибки
  */

@observer
class BSMobxField extends React.Component {
  constructor(props) {
    super(props);
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
    //  else {
    //   this._setValue(fieldValue);
    // }
    // reaction(
    //   () => this.formApi.data[this.name],
    //   value => this._setValue(value),
    // );
  }

  @action
  _setValue = (value) => {
    this.formApi.data[this.name] = value;
  }

  onChange = (newValue) => {
    this._setValue(newValue);
  }


  render() {
    const { сomponent: Component, type, formApi, ...props } = this.props;
    const value = formApi.data[this.name];
    const error = formApi.errors[this.name];
    if (Component && typeof (Component) === 'function') {
      return (
        <Component
          onChange={this.onChange}
          value={value}
          error={error}
          maxLength={this.maxLength}
          {...props}
        />
      );
    }

    let getField = null;
    switch (this.type) {
      case 'text':
      case 'password':
      case 'number':
        getField = getTextTemplate;
        break;
      case 'checkbox':
        getField = getCheckboxTemplate;
        break;
      case 'select':
        getField = getSelectFieldTemplate;
        break;
      case 'datepicker':
        getField = getDatePickerTemplate;
        break;
      default:
    }
    return getField({
      props, value, onChange: this.onChange, error, maxLength: this.maxLength, type: this.type,
    });
    // return (
    //   <FormInputField
    //     type={this.type}
    //     onChange={this.onChange}
    //     value={this.formApi.data[this.name]}
    //     maxLength={this.maxLength}
    //     error={this.formApi.errors[this.name]}
    //     {...this.props}
    //   />
    // );
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

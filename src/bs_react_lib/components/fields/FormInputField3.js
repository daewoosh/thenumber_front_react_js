import React from 'react';
import { PropTypes } from 'prop-types';
import { TextField, Checkbox, SelectField } from 'material-ui';
import DatePicker from 'react-datepicker';
import DatePickerInput from 'components/DatePickerInput';

const getTextTemplate = ({ props }) => {
    const handleOnChange = (event,value) => onChange(value);
    return (
      <TextField
        className={props.className || ''}
        hintText={props.label}
        errorText={!!props.error && props.error}
        multiLine={props.multiLine || false}
        rows={props.rows || 1}
        disabled={props.disabled || false}
        onChange={props.onChange}
        {...props}
      />
  );
};

const getCheckboxTemplate = ({ props }) => {
  const handleOnCheck = (event,value) => onChange(value);
  const result = (
    <Checkbox
      className={props.className || 'new-checkbox'}
      checked={props.value!== '' && props.value}
      onCheck={handleOnCheck}
      disabled={props.disabled || false}
      {...props}
    />
  );
  return result;
};

const getSelectFieldTemplate = ({ props }) => {
  const handleSelectChange = (event, index, value) => onChange(value);
  const result = (
    <SelectField
      className={props.className || ''}
      floatingLabelText={props.label || ''}
      errorText={props.error}
      onChange={handleSelectChange}
      disabled={props.disabled || false}
      {...props}
    >
      {props.children}
    </SelectField>
  );
  return result;
};

const getDatePickerTemplate = ({ props }) => {
  const result = (
    <DatePicker
      className={props.className || 'datepicker'}
      customInput={<DatePickerInput />}
      placeholderText={props.label}
      dateFormat={props.dateFormat || 'DD.MM.YYYY'}
      selectsStart={props.selectsStart || true}
      withPortal={props.withPortal || true}
      showYearDropdown={props.showYearDropdown || true}
      showMonthDropdown={props.showMonthDropdown || true}
      dropdownMode={props.dropdownMode || 'select'}
      {...props}
    />
  );
  return result;
};

const FormInputField = ({ type, ...props}) => {
  let Field = null;
  switch (type) {
    case 'text':
    case 'password':
    case 'number':
      Field = getTextTemplate({ props });
      break;
    case 'checkbox':
      Field = getCheckboxTemplate({ props });
      break;
    case 'select':
      Field = getSelectFieldTemplate({ props });
      break;
    case 'datepicker':
      Field = getDatePickerTemplate({ props });
      break;
    default:
  }
  return Field;
};

FormInputField.propTypes = {
  props: PropTypes.any,
};

export default FormInputField;

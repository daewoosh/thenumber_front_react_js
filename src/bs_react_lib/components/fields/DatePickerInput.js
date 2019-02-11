import React from 'react';
import TextField from 'material-ui/TextField';
import { PropTypes } from 'prop-types';

const DatePickerInput = (props) => {
  const btnText = props.value !== '' ? props.value : 'не указано';
  const component = (
    <TextField className="form-item-dtp" onClick={props.onClick} value={btnText}/>
  );
  return component;
};

DatePickerInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default DatePickerInput;

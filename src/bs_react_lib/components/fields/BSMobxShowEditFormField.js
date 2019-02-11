import React from 'react';
import { PropTypes } from 'prop-types';
import BSMobxField from './BSMobxField';

const BSMobxShowEditFormField = ({
  viewMode, showComponent, showClassName, ...props
}) => {
  if (viewMode === 'edit') {
    return (
      <BSMobxField
        {...props}
      />
    );
  }
  if (viewMode === 'show') {
    return (
      <span className={showClassName || 'form-item'}>
        {showComponent}
      </span>
    );
  }
  return null;
};

BSMobxShowEditFormField.propTypes = {
  bsType: PropTypes.string,
  required: PropTypes.bool,
  //validate: PropTypes.arrayOf(PropTypes.func),
  viewMode: PropTypes.string,
  showClassName: PropTypes.string,
  type: PropTypes.string,
  showComponent: PropTypes.func,
};

export default BSMobxShowEditFormField;

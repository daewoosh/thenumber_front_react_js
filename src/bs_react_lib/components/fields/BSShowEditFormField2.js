import React from 'react';
import { PropTypes } from 'prop-types';
import BSField from './BSField4';

const BSShowEditFormField = ({
  viewMode, showComponent, showClassName, ...props
}) => {
  if (viewMode === 'edit') {
    return (
      <BSField
        {...props}
      />
    );
  }
  if (viewMode === 'show') {
    return (
      <div className={showClassName || ''}>
        {showComponent}
      </div>
    );
  }
  return null;
};

BSShowEditFormField.propTypes = {
  bsType: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.arrayOf(PropTypes.func),
  viewMode: PropTypes.string,
  showClassName: PropTypes.string,
  type: PropTypes.string,
  showComponent: PropTypes.func,
};

export default BSShowEditFormField;

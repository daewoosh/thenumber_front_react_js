import React from 'react';


const HideComponent = ({ children, isHide }) => isHide ? null : children;

export default HideComponent;
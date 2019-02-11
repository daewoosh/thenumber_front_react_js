import React, { Component } from 'react';
import cx from 'classnames';
import './PopUpComponent.less';

class PopUpComponent extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {className,direction, children, show} = this.props
    let slideDirection;
    switch(direction) {
      case 'left':
      slideDirection="left-slide";
      break;
      case 'right':
      slideDirection="right-slide";
      break;
      case 'top':
      slideDirection="top-slide";
      break;
      case 'bottom':
      slideDirection="bottom-slide";
      break;
    }
    return(
      <div className={cx(
         slideDirection, className,
        {
          _ishown: show=== true,
          _ishide: show === false,
        }
      )}
      >
        {children}
      </div>
    )
  }
}
export default PopUpComponent



import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { ListItem } from 'material-ui/List';
import Done from 'material-ui/svg-icons/action/done';
import { Row, Col } from 'react-bootstrap';
import cx from 'classnames';

class SelectionListItemModal extends Component {

  getSecondaryText = () => {
    const secondaryText = this.props.isCounting ? 
    (
      <Fragment>
            X {this.props.count}
      </Fragment>
    ) : (
      null
    );
    return secondaryText;
  };

  handleClick = () => {
    this.props.handleClick(this.props.keyProp, this.props.isSelected);
  };

  render() {
    const { isSelected  } = this.props;
    const primaryText = this.props.value;
    return (
      <ListItem
        onClick={this.handleClick}
        primaryText={this.getSecondaryText()}
        primaryText={primaryText}
        leftAvatar={
          <Done
            className={   cx('d-none',
              {
                'green-visible': isSelected,
              },
            )}
          />
        }
      />
    );
  }
}

SelectionListItemModal.propTypes = {
  data: PropTypes.shape({}),
  key: PropTypes.string,
  value: PropTypes.string,
  count: PropTypes.number,
  isCounting: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default SelectionListItemModal;

import BSMobxStore from 'bs_react_lib/stores/BSMobxStore';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { List } from 'material-ui/List';
import { observer, Provider } from 'mobx-react';
import { observable, action } from "mobx";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle, CardText, CardMedia, CardHeader, CardActions } from 'material-ui/Card';
import { includes, remove } from 'lodash';
import SelectionListItemModal from './SelectionListItemModal';
import Drawer from 'material-ui/Drawer';

const ListItemsObserver = observer(({ controller, emptyText, isCounting, handleItemClick }) => {
  if (controller.store.collection.length === 0) {
    return emptyText;
  }
  const selectedCount = controller.selectedCount;
  const listItems = controller.store.collection.map((item) => {
    const isSelected = !!controller.selectedItems[item[controller.store.keyPropName]];
    return <SelectionListItemModal
      key={item[controller.store.keyPropName]}
      keyProp={item[controller.store.keyPropName]}
      value={item[controller.store.valuePropName]}
      data={item}
      isCounting={isCounting}
      isSelected={isSelected}
      handleClick={handleItemClick}
    />;
  });
  return listItems;
});

@observer
class SelectionListModal extends Component {
  constructor(props) {
    super(props);
    this.controller = props.controller;
  }

  handleItemClick = (key, isSelected) => {
    this.controller.toggleSelect(key, isSelected);
  };

  handleClose = () => {
    this.controller.rollback();
    this.controller.close();
  };

  handleDone = () => {
    this.controller.commit();
    this.controller.close();
  };

  render() {
    const { title, emptyText, isCounting, isFullWidth, isDrawer
    } = this.props;

    const { selectedCount, isOpen, } = this.controller;
    const isDoneDisable = selectedCount === 0;
    const contentStyle = isFullWidth ? customContentStyle : {};
    const actions = [      
      <RaisedButton
        label="Выбрать"
        buttonStyle={{ borderRadius: 60 }}
              style={{ borderRadius: 60 }}
              labelColor={'#FFFFFF'}
              backgroundColor={"#FF7C00"}
        disabled={isDoneDisable}
        onTouchTap={this.handleDone}
        fullWidth
      />,<FlatButton
      label="Отмена"
      primary
      fullWidth
      onTouchTap={this.handleClose}
      style={{ margin: '0px 10px' }}
    />,
    ];
    if (isDrawer !== undefined && isDrawer === true) {
      return (
        <Drawer width="30%"
                className="rec-filter"
                open={isOpen} >
          <CardText className="rec-filter-item">
            <h2>{title}</h2>
          </CardText>
          <CardText className="rec-filter-item">
            <List>
              <ListItemsObserver  controller={this.controller}
                                  emptyText={emptyText}
                                  isCounting={isCounting}
                                  handleItemClick={this.handleItemClick}/>
            </List>
          </CardText>
          
          
          <CardActions>
          <RaisedButton
              label="Выбрать"
              buttonStyle={{ borderRadius: 60 }}
              style={{ borderRadius: 60 }}
              labelColor={'#FFFFFF'}
              backgroundColor={"#FF7C00"}
              onTouchTap={this.handleDone}
              fullWidth
            />
            <FlatButton
              label="Отмена"
              primary
              fullWidth
              onTouchTap={this.handleClose}
              style={{ margin: '0px 10px' }}
            />
            
          </CardActions>
        </Drawer>
      );
    }
    else {
      return (
        <Dialog
          modal
          actions={actions}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
          open={isOpen}
          title={this.props.title}>
          <List>
            <ListItemsObserver
              controller={this.controller}
              emptyText={emptyText}
              isCounting={isCounting}
              handleItemClick={this.handleItemClick}
            />
          </List>
        </Dialog>
      );
    }
  }
}

SelectionListModal.propTypes = {
  controller: PropTypes.shape({}),
  title: PropTypes.string,
  // isOpen: PropTypes.bool,
  isCounting: PropTypes.bool,
  //isMultiple: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  // selectedItems: PropTypes.arrayOf(PropTypes.any), // eslint-disable-line
  emptyText: PropTypes.string,
  handleClose: PropTypes.func,
};

export default SelectionListModal;

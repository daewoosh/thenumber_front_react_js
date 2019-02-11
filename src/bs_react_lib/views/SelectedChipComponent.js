// import SelectedChipComponent from 'bs_react_lib/views/SelectedChipComponent';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { List } from 'material-ui/List';
import { observer, Provider, } from 'mobx-react';
import { reaction } from 'mobx';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Clear from 'material-ui/svg-icons/content/clear';
import { includes, remove } from 'lodash';
import HideComponent from 'bs_react_lib/components/HideComponent';

const ListItemsObserver = observer(({ controller, emptyText, handleItemClick, keyName, isMultiple, singleValue, viewMode }) => {
  if (isMultiple === true) {
    if (controller.store.collection.length === 0) {
      return null;
    }
    const selectedCount = controller.selectedCount;
    const listItems = controller.store.collection.map((item) => {
      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleItemClick(item[keyName]);
      };
      const isSelected = !!controller.selectedItems[item[controller.store.keyPropName]];
      if (isSelected === false) {
        return null;
      }
      return (
        <Chip
          key={item[controller.store.keyPropName]}
          keyProp={item[controller.store.keyPropName]}
          className="chip-select"
        > 
          <div className="inner-chip">
            <span>{item[controller.store.valuePropName]}</span>
            <HideComponent isHide={viewMode==='show'} ><span onClick={handleClick} className="chip-delete"><Clear/></span></HideComponent>
          </div>

        </Chip>
      );
    });
    return (
      <div className='chip-view-comp'>
        {listItems}
      </div>
    );
  }
  else {
    if (singleValue === ''){
      return null
    }
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleItemClick();
    }
    return (
      <div className='chip-view-comp'>
      <Chip
        className="chip-select"
      >
        <div className='inner-chip'>
          <span>{singleValue}</span>
         <HideComponent isHide={viewMode==='show'}><span onClick={handleClick} className="chip-delete"><Clear/></span></HideComponent>
        </div>
      </Chip>
      </div>
    );
  }
});

@observer
class SelectedChipComponent extends Component {
  constructor(props) {
    super(props);
    this.controller = props.controller;
  }
  render() {
    const { emptyText, handleItemClick, keyName, isMultiple, singleValue, viewMode } = this.props;
    const { selectedItems } = this.controller;
    const { store: { collection } } = this.controller;
    return (
      <ListItemsObserver
        selectedItems={selectedItems}
        controller={this.controller}
        collection={collection}
        emptyText={emptyText}
        handleItemClick={handleItemClick}
        keyName={keyName}
        isMultiple={isMultiple}
        singleValue={singleValue}
        viewMode={viewMode}
        // isLink={isLink}
      />
    );
  }
}
export default SelectedChipComponent;

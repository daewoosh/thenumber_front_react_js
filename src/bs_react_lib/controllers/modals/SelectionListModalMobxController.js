import { observable, action, toJS } from "mobx";


class SelectionListModalMobxController {
  constructor({ store, selectedItems = [], isMultiple = false, onChange }) {
    if (!store) {
      throw new Error('Не определено хранилище');
    }

    if (!store.collection) {
      throw new Error('Store must have collection');
    }
    this.store = store;
    this.isMultiple = isMultiple;

    this.setSelectedItems({ selectedItems });
    //храним все принятые
    this.сommitItems = selectedItems;
    if (onChange && typeof (onChange) !== 'function') {
      console.log("it is not function");
    }
    else {
      this.onChange = onChange;
    }

  }

  @observable
  selectedItems = {};

  @observable
  isOpen = false;

  @observable
  selectedCount = 0;

  @action
  selectItem(key) {
    if (!this.checkKey(key)) return;
    this.selectedItems[key] = key;
    this.selectedCount++;
  }
  @action
  deselectItem(key) {
    if (!this.checkKey(key)) return;
    if (this.selectedItems[key]) {
      delete this.selectedItems[key]
      this.selectedCount--;
    }
  }

  @action
  setIsDoneDisable(value = true) {
    this.isDoneDisable = value;
  }
  @action
  open() {
    // this.deselectAllItem();
    this.isOpen = true;
  }
  @action
  close() {
    this.isOpen = false;
  }
  /** Принятие выбранного */
  commit() {
    this.сommitItems = Object.getOwnPropertyNames(toJS(this.selectedItems));
    if (this.onChange) {
      this.onChange(this.getData());
    }
  }
  /** Отклонение выбранного */
  rollback() {
    this.setSelectedItems({ selectedItems: this.сommitItems });
  }

  deselectAllItem() {
    const props = Object.getOwnPropertyNames(toJS(this.selectedItems));
    props.forEach(el => {
      this.deselectItem(el);
    });
    // for (p in props) {
    //   this.deselectItem(this.selectedItems[p]);
    // }
  }

  checkKey(key) {
    if (!key) {
      console.log("key is empty")
      return false;
    }
    return true;
  }
  /**Установка выбранных */
  setSelectedItems({ selectedItems = [] }) {
    //все сняли
    this.deselectAllItem();
    //установили новые
    selectedItems.forEach(el => {
      this.selectItem(el);
    })
  }

  toggleSelect(key, isSelected) {
    if (!this.checkKey(key)) return;
    if (!isSelected) {
      if (!this.isMultiple && this.selectedCount > 0) {
        this.deselectAllItem();
      }
      if (this.isMultiple ||
        (!this.isMultiple && this.selectedCount === 0)) {
        this.selectItem(key);
        return;
      }
    }

    this.deselectItem(key);
  }

  getData() {
    const res = [];
    const hbMap = toJS(this.store.hbMap);
    this.сommitItems.forEach(el => {
      res.push(hbMap[el]);
    })
    return res;
  }



}

export default SelectionListModalMobxController;

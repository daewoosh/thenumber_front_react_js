import { observable, action } from 'mobx';
import BSMobxStore from './BSMobxStore2';

/**
 * Mobx стора для списков BSPagedCollection
 * @event {Array} hbload при загрузки данных 
 */
class BSMobxPagedCollectionStore extends BSMobxStore {
  constructor(config = {}) {
    super(config);
  }

  @observable
  collection = [];

  @observable
  total = null;

  @observable
  pageNumber = 0; // для next page

  @observable
  pageSize = null;

  /**Установка колекции и добавление  */
  @action
  setData(data) {
    //super.setData();
    //const res =[...collection];
    // const res = collection.map(el => {
    //   el.Key = el[this.keyPropName];
    //   el.Value = el[this.valuePropName];
    //   return el;
    // });
    this.collection = data.Collection;
    this.total = data.Total;
    this.pageNumber = data.PageNumber;
    this.pageSize = data.PageSize;
    
    this.emit('setdata', this)
  }


}

export default BSMobxPagedCollectionStore;
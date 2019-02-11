import { observable, action, isObservable, computed, reaction, toJS } from 'mobx';
import BSMobxStore from './BSMobxStore2';


/**
 * Mobx стора для списков HB вида [{Key,Value},]
 * @event {Array} hbload при загрузки данных 
 */
class BSMobxHBStore extends BSMobxStore {
  constructor(config = {}) {
    super(config);
    this.keyPropName = config.keyPropName || "Key";
    this.valuePropName = config.valuePropName || "Value";
  }

  @observable
  collection = [];

  getKeyProp(item){
    if(!item){
      this._throwErr(`Not set item in getKeyProp`);
    }
    return item[this.keyPropName];
  }

  @computed
  get hbMap() {
    const map = {};
    this.collection.forEach((item) => {
      map[this.getKeyProp(item)] = item;
    });
    return map;
  }

  getByKey(key, throwEx = true) {
    if (!key) {
      return null;
    }
    const res = this.hbMap[key];
    
    if(!res && throwEx){
      this._throwErr(`Not define value from key ${key}`)
    }
    return res
  }

  // /**Событие которое возвращает Promise с данными  */
  // onHBLoad() {
  //   if (this._loadStatus === BSMobxStore.loadStatus.loaded) {
  //     return Promise.resolve(toJS(this.collection));
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.on('hbload', data => {
  //       resolve(data);
  //     })
  //   })
  // }

  /**Установка колекции и добавление  свойств  Key Value */
  @action
  setData(collection = []) {
    //super.setData();
    //const res =[...collection];
    // const res = collection.map(el => {
    //   el.Key = el[this.keyPropName];
    //   el.Value = el[this.valuePropName];
    //   return el;
    // });
    this.collection = collection;
    this.emit('setdata', this)
  }


}

export default BSMobxHBStore;
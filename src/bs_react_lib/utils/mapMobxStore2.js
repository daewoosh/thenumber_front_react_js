//import mapMobxStore from 'bs_react_lib/utils/mapMobxStore';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
/** Функция берет стору из options.store если она задана или
 * извлекает стору по имени options.storeName из компонета WrappedComponent
 * далее из сторы достаются отслеживаемые элементы функцией  mapStoreToProps
 * изменение которых отслеживаются observer
 * options.getStore (props) => store
 */
const mapMobxStore = (WrappedComponent, mapStoreToProps , options = { storeName: 'store',getStore: null , autoLoad: false }) => {
  const wrap = @observer class wr extends Component {
    constructor(props) {

      if(typeof(mapStoreToProps) !== 'function'){
        throw Error(`mapMobxStore: property mapStoreToProps is not function`);
      }

      if(options.getStore && typeof(options.getStore) !== 'function') {
        throw Error(`mapMobxStore: property getStore is not function`);
      }

      super(props);

      this.store = props[options.storeName];
      if(options.getStore){
        this.store = options.getStore(props);
      }
      if (!this.store) {
        throw Error(`mapMobxStore: store not set`);
      }
    }
    componentWillMount() {
      if (options.autoLoad){
        this.store.load();
      }
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...mapStoreToProps(this.store, this.props)}
        />
      );
    }
  };
  return wrap;
};

export default mapMobxStore;

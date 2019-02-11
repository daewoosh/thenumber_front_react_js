//import mapMobxStore from 'bs_react_lib/utils/mapMobxStore';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
/** Функция берет стору из options.store если она задана или
 * извлекает стору по имени options.storeName из компонета WrappedComponent
 * далее из сторы достаются отслеживаемые элементы функцией  mapStoreToProps
 * изменение которых отслеживаются observer
 */
const mapMobxStore = (WrappedComponent, mapStoreToProps, options = { storeName: 'store', store: null, autoLoad: false }) => {
  const wrap = @observer class wr extends Component {
    constructor(props) {
      super(props);
      this.store = options.store || props[options.storeName];
      if (!this.store) {
        throw Error(`mapMobxStore: property ${options.storeName} not set`);
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
          {...mapStoreToProps(this.store)}
        />
      );
    }
  };
  return wrap;
};

export default mapMobxStore;

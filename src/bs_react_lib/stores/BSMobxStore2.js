import { observable, action, isObservable, toJS, runInAction } from 'mobx';
import Emitter from 'bs_react_lib/utils/Emitter';

/**
 * Mobx стора с поддержкой загузки данных с сервера
 * - @{data} observable объект в котором храняться данные после загрузки с сервера 
 * -  Данные после загрузки с сервера храняться в  observable объекте data
 */
class BSMobxStore {
  storeName='BSMobxStore2';
  //constructor({initState, action, serverMethodName, sendMethod, successMessage, actionId }) {
  constructor(config = {}) {
    Emitter(this);
    this._init(config);
  }

  /** Объект в котором храняться данные после загрузки с сервера 
   * (создается программно методом initObservable )
   * в качестве шаблона полей с начальными значениями принимается объект initState из config
   */
  // @observable
  // data = {};

  static sendMethodTypes = {
    POST: 'POST',
    GET: 'GET',
  };

  /** Статусы загрузки */
  static loadStatus = {
    none: 'none',
    loading: 'loading',
    loaded: 'loaded',
    error: 'error'
  };

  /**
   * Действие по умолчанию (params = {}) => { return Promise; }
   */
  _action = () => Promise.reject(new Error('Действие не определено'));

  /**
   * Метод отправки по умолчанию
   */
  _sendMethod = 'POST';

  /**
   * Имя метода для получения данных с сервера
   */
  _serverMethodName = '';

  /**
   * Определение ид действия
   */
  _actionId = undefined;

  /**
   * Определение набора свойст для инициализации
   */
  _initStateProps = undefined;

  /** Параметры для загрузки */
  _loadParams = {};

  /** Статус загрузки сторы */
  _loadStatus = BSMobxStore.loadStatus.none;

  /** Время загрузки сторы милисекунды */
  _loadTimeMs = 0;

  /** Время храниения данных милисекунды */
  _cachePeriodMs = undefined;

  /**
   * Определение состояния загрузки данных
   */
  @observable
  isLoaded = true;

  /**
   * Определяет готовность сторы 
   * можно переопределить в более сложных сторах если готовность будет зависить
   * от разных факторов
   */
  get isReady() {
    return this.on('setdata');
  }

  /**
   * Установка состояния загрузки
   */
  @action
  setIsLoaded(value) {
    this.isLoaded = value;
  }

  /** Вызовется когда произойде инициализация отслеживаемых свойст
   * Переопределить в наследнике если есть необходимость опеделить
   * дополнительные отслеживаемые свойства
   */
  onObservableInit() {

  }

  _throwErr(errMsg) {
    throw new Error(`BSMobxStore: ${errMsg}`);
  }

  _init(config = {}) {
    /** Если не задан initState то не создаем отслеживаемый объект data */
    if (config.initState) {
      this.initObservable(config.initState);
    }

    /**
     * Установка действия если оно задано явно
     */
    if (config.action && typeof config.action === 'function') {
      this._action = config.action;
      return;
    }

    // if (!config.serverMethodName) {
    //   this._throwErr('Некорректные входные параметры');
    // }

    /**
     * Установка метода отправки
     */
    if (config.sendMethod && BSMobxStore.sendMethodTypes[config.sendMethod.toUpperCase()]) {
      this._sendMethod = config.sendMethod;
    }

    /**
     * Установка имени метода 
     */
    this._serverMethodName = config.serverMethodName;

    /**
     * Установка ид действия 
     */
    this._actionId = config.actionId;


    /**
     * Создание действия
     */
    if (this._serverMethodName) {
      this._action = (params = {}) => bsAjaxMethod({
        serverMethodName: this._serverMethodName,
        sendMethod: this._sendMethod,
        params,
        actionId: this._actionId,
      });
    }
  }

  /**
   * Создание ослеживаемых свойств и первичная инициализация
   * Необходимо для работы интерфейсов при инициализации и последующем обновлении после
   * загрузки данных с сервера
   */
  initObservable(initState = {}) {
    if (typeof initState != 'object') {
      this._throwErr('initState должен быть объектом');
    }
    const props = Object.getOwnPropertyNames(initState);
    if (props.length === 0) {
      return;
    }
    this._initStateProps = props;
    const data = {};
    for (let p in props) {
      const propName = props[p];
      data[propName] = initState[propName];
    }
    this.data = observable(data);
    this.emit('init', this);
    console.info(`${this.storeName} observable inited`);
    this.onObservableInit();
  }

  /**Установка статуса загружено */
  setLoadedStatus() {
    this._loadStatus = BSMobxStore.loadStatus.loaded;
    this._loadTimeMs = new Date().getTime();
    this.setIsLoaded(true);
  }

  /**Установка статуса в процессе загрузки */
  setLoadingStatus() {
    this.setIsLoaded(false);
    this._loadStatus = BSMobxStore.loadStatus.loading;
  }

  // /**Событие которое возвращает Promise с данными  */
  // onLoad() {
  //   if (this._loadStatus === BSMobxStore.loadStatus.loaded) {
  //     return Promise.resolve(this);
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.on('load', store => {
  //       resolve(store);
  //     })
  //   })
  // }

  // /** Событие которое возвращает Promise с данными 
  //   * после установки свойст после этого события 
  //   * можно обрашаться к свойствам store
  //   */
  // onSetData() {
  //   return new Promise((resolve, reject) => {
  //     this.on('setdata', store => {
  //       resolve(store);
  //     })
  //   })
  // }

  /** Событие которое возвращает Promise с данными 
    * после инициализации observable объекта после этого события 
    * можно обрашаться к свойствам store при этом значения еще не установлены
    */
  // onInit() {
  //   return new Promise((resolve, reject) => {
  //     this.on('init', (store) =>resolve(store))
  //   })
  // }

  /** Установка значений отслеживаемых свойст на стору 
  * из источника по объекту this._initStateProps
  */
  _setData(source) {
    if (!!!source) {
      this._throwErr('Некорректные входные параметры');
    }

    if (typeof source != 'object') {
      this._throwErr('initObservable: source должен быть объектом');
    }

    /** Если не проведена инициализация то проводим её на основе присланного объекта */
    if (!this.data || !isObservable(this.data)) {
      this.initObservable(source);
      return;
    }

    if (this._initStateProps && this._initStateProps.length > 0) {
      runInAction(()=>{
        for (let p in this._initStateProps) {
          const propName = this._initStateProps[p];
          if (source[propName] != undefined) {
            this.data[propName] = source[propName];
          }
        }
      })
    }
  }

  /**
   * Установка данных.
   * Устанавливает: 
   * isLoaded = true
   * _loadStatus = loaded
   * Необходимо наличие у сторы отслеживаемого объекта data
   */
  @action
  setData(data) {
    if (data) {
      this._setData(data);
      this.emit('setdata', this)
      console.info(`${this.storeName} setdata event`);
    }
    this.setLoadedStatus();
  }

  _load(params = {}) {
    this.loadParams = params;
    this.setLoadingStatus();
    this._action(params)
      .then(data => {
        this.setLoadedStatus();
        this.emit('load', this);
        console.info(`${this.storeName} loaded`);
        this.setData(data);
      }, err => this._loadStatus = BSMobxStore.loadStatus.error);
  }

  /** Вызовется после метода load */
  postLoad(){

  }


  /**
   * Загрузка данных с использованием action   (Устанавливает isLoaded = false)
   */
  load(params = this.loadParams) {
    debugger;
    if (this._cachePeriodMs &&
      new Date().getTime() - this._loadTimeMs > this._cachePeriodMs) {
      setTimeout(this.reLoad, 0);
    }
    if (this._loadStatus === BSMobxStore.loadStatus.loading ||
      this._loadStatus === BSMobxStore.loadStatus.loaded) {
      return this;
    }
    this._load(params);
    this.postLoad();
    return this;
  }

  reLoad(params = this.loadParams) {
    this._load(params);
    return this;
  }



  /**
 * Получение объекта данных
 */
  getData() {
    const res = {};
    for (let p in this._initStateProps) {
      const propName = this._initStateProps[p];
      res[propName] = isObservable(this.data[propName]) ? toJS(this.data[propName]) : this.data[propName];
    }
    return res;
  }
}



export default BSMobxStore;
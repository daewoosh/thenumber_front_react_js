import { observable, action, isObservable, toJS } from 'mobx';

const sendMethodTypes = new Map();
sendMethodTypes.set('POST');
sendMethodTypes.set('GET');
 
/**
 * Mobx стора с поддержкой загузки данных с сервера
 * - @{data} observable объект в котором храняться данные после загрузки с сервера 
 * -  Данные после загрузки с сервера храняться в  observable объекте data
 */
class BSMobxStore {
  //constructor({initState, action, serverMethodName, sendMethod, successMessage, actionId }) {
  constructor(config = {}) {
    this._init(config);
  }

  /** Объект в котором храняться данные после загрузки с сервера 
   * (создается программно методом initObservable )
   * в качестве шаблона полей с начальными значениями принимается объект initState из config
   */
  // @observable
  // data = {};

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
  _serverMethodName='';

  /**
   * Определение ид действия
   */
  _actionId = undefined;

  /**
   * Определение набора свойст для инициализации
   */
  _initStateProps = undefined;

  /**
   * Определение состояния загрузки данных
   */
  @observable
  isLoaded = true;

  /**
   * Установка состояния загрузки
   */
  @action
  setIsLoaded(value) {
    this.isLoaded = value;
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
    if (config.sendMethod && sendMethodTypes.has(config.sendMethod.toUpperCase())) {
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
    if (typeof initState != 'object'){
      this._throwErr('initState должен быть объектом');
    }
    const props = Object.getOwnPropertyNames(initState);
    if (props.length === 0) {
      return;
    }
    this._initStateProps = props;
    const data = {};
    for(let p in props) {
      const propName = props[p];
      data[propName] = initState[propName];
    }
    this.data = observable(data);
  }

  /**
   * Установка данных. (Устанавливает isLoaded = true)
   * Необходимо наличие у сторы отслеживаемого объекта data
   */
  @action
  setData(data) {
    if (data) {
      this._setData(data);
    }
    this.setIsLoaded(true);
  }

  /**
   * Загрузка данных с использованием action   (Устанавливает isLoaded = false)
   */
  load(params = {}) {
    this.setIsLoaded(false);
    this._action(params)
      .then(data => this.setData(data));
  }

  /** Установка отслеживаемых свойст на стору из источника по объекту this._initStateProps
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
      for(let p in this._initStateProps) {
        const propName = this._initStateProps[p];
        if (source[propName] != undefined) {
          this.data[propName] = source[propName];
        }
      }
    }
  }

  /**
 * Получение объекта данных
 */
  getData() {
    const res = {};
    for(let p in this._initStateProps) {
      const propName = this._initStateProps[p];
      res[propName] =isObservable(this.data[propName])?toJS(this.data[propName]):this.data[propName];
    }
    return res;
  }
}

export default BSMobxStore;
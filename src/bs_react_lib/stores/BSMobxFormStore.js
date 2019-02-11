import { observable, reaction, action } from 'mobx';
import BSMobxStore from './BSMobxStore';

/**
 * Mobx стора данных формы с поддержкой загузки данных с сервера
 */
class BSMobxFormStore extends BSMobxStore {
  constructor(config = {}) {
    super(config);
    if (!config.initState) {
      this._throwErr('не задан initState');
    }
    this.initFormObservable();
  }

  @observable
  isValid = true;

  /** Объект в котором храняться данные по ошибкам полей валидации 
   * (создается программно методом initFormObservable )
   * в качестве шаблона полей принимается объект initState из config
   */
  // @observable
  // errors = {};

  /**
   * Проверка ошибок во всех полях
   */
  @action
  validate() {
    var isValid= true;
    for(let p in this._initStateProps) {
      const propName = this._initStateProps[p];
      if (this.errors[propName]){
       isValid = false;
       break;
      }
    }
    this.isValid = isValid;
  }

  /**
   * Инициализация 
   */
  initFormObservable() {
    if (this._initStateProps.length === 0) {
      this._throwErr('initState пуст');
    }
    var errors = {};
    for(let p in this._initStateProps) {
      const propName = this._initStateProps[p];
      errors[propName] ='';
    }
    this.errors = observable(errors);
    /** Установка отслеживания ошибки */
    for(let p in this._initStateProps) {
      const propName = this._initStateProps[p];
      reaction(
        () => this.errors[propName],
        err => {
          this.validate();
        },
      );
    }
    
  }
}

export default BSMobxFormStore;

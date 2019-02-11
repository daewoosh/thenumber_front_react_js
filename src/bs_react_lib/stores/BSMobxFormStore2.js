import { observable, reaction, action } from 'mobx';
import BSMobxStore from './BSMobxStore2';
//Необходимо определить сервис ValidationService
import { getValidators, getValidatorData } from 'services/ValidationService';


const throwErr = (errMsg) => {
  throw new Error(`BSMobxFormStore: ${errMsg}`);
};

const checkFormField = (propName, initState) => {
  const bsType = initState[propName].bsType;
  const validators = initState[propName].validators;
  /** Необходимо определить либо bsType либо список функций валидации validators */
  if (!bsType && (!validators || validators.length == 0)) {
    throwErr(`Определите bsType или  функции валидации validators для поля ${propName}`);
  };
}

const transformationInitState = (initState) => {
  if (!initState) {
    throwErr('Не задан initState');
  }
  if (typeof initState != 'object') {
    throwErr('initState должен быть объектом');
  }
  const props = Object.getOwnPropertyNames(initState);
  if (props.length === 0) {
    throwErr('initState должен содержать хоть одно свойство формата name: { value:VALUE_VALUE, bsType: BSTYPE_VALUE, validators: VALIDATARS_VALUE, required?:true|false } ');
  }
  const initData = {};
  const validateData = {};

  for (let p in props) {
    const propName = props[p];
    checkFormField(propName, initState);
    initData[propName] = initState[propName].value;
    validateData[propName] = {
      bsType: initState[propName].bsType,
      validators: initState[propName].validators || [],
      required: initState[propName].required || false,
    }
  }
  return { initData, validateData };
};


/**
 * Mobx стора данных формы с поддержкой загузки данных с сервера
 */
class BSMobxFormStore extends BSMobxStore {
  constructor(config = {}) {
    /** Необходимо переложить данные из формата формы в формат mobxStore */
    // const { initData, validateData } = transformationInitState(config.initState);
    /** Версия для инициализации data в BSMobxStore */
    // const newConfig = { ...config, ...{ initState: initData } };
    super(config);
    this.initValidateData(config.validateData);
    this.initFormObservable();
  }

  @observable
  isValid = true;

  /** Объект в котором храняться данные по валидации
   * (создается программно методом initFormObservable )
   * объект со свойствами формата
   * { bsType: BSTYPE_VALUE,
   *  validators: VALIDATARS_VALUE, массив функций (value) => string: errorMsg | ""
   *  required:true|false }
   */

  // this.formData = {}


  /** Объект в котором храняться данные по ошибкам полей валидации
   * (создается программно методом initFormObservable )
   * в качестве шаблона полей принимается объект initState из config
   */
  // @observable
  // errors = {}


  /** Вызовется когда произойде инициализация отслеживаемых свойст в форме
 * Переопределить в наследнике если есть необходимость опеделить
 * дополнительные отслеживаемые свойства
 */
  onFormObservableInit() {

  }

  /**
   * Проверка ошибок во всех полях которые объявлены в validateData
   */
  @action
  checkIsValid() {
    var isValid = true;
    for (let p in this._validateDataProps) {
      const propName = this._validateDataProps[p];
      if (this.errors[propName]) {
        isValid = false;
        break;
      }
    }
    this.isValid = isValid;
  }

  validateProp = (value, propName) => {
    if (!propName == null) {
      throwErr('Не определен propName');
    }
    if (!this.formData) {
      throwErr('Не определен formData');
    }
   
    if (!this.formData[propName] || !this.formData[propName].isActive) {
      //Если нет в валидации или не активно то не валидируем
      return '';
      //throwErr(`Не определены данные в formData по ${propName}`);
    }

    const { validators} = this.formData[propName];

    if (!validators || validators.length == 0) {
      throwErr(`Не определены валидаторы в formData по ${propName}`);
    }

    for (let i = 0; i < validators.length; i += 1) {
      //Если обязательность отметнена то не проверяем
      if(validators[i].validetorName ==='required' 
      && !this.formData[propName].required ){
        return '';
      }
      //вызываем валидаторы и передаем значение и вторым параметром ссылку на стору
      const er = validators[i](value, this);

      if (er) {
        return er;
      }
    }
    return '';
  };

  checkFormField(propName, validateData) {
    if (!propName in this.data) {
      throwErr(`Свойство валидации ${propName} отсутствует в initState`);
    }
    const bsType = validateData[propName].bsType;
    const validators = validateData[propName].validators;
    const required = validateData[propName].required || false;
    /** Необходимо определить либо bsType либо список функций валидации validators либо установить required */
    if (!bsType && (!validators || validators.length == 0) && !required) {
      throwErr(`Определите bsType или  функции валидации validators или установите required для поля ${propName}`);
    };
  }

  initValidateData(validateData = {}) {
    if (!validateData) {
      throwErr('Не задан validateData');
    }
    if (typeof validateData != 'object') {
      throwErr('validateData должен быть объектом');
    }
    /** Валидацию можно задавать не на все поля объекта поэтому свойства могут различаться */
    this._validateDataProps = Object.getOwnPropertyNames(validateData);
    if (this._validateDataProps.length === 0) {
      throwErr('validateData должен содержать хоть одно свойство формата name: { bsType: BSTYPE_VALUE, validators: VALIDATARS_VALUE, required?:true|false } ');
    }


    this.formData = {};
    for (let p in this._validateDataProps) {
      const propName = this._validateDataProps[p];
      this.checkFormField(propName, validateData);
      const srvValidators = getValidators(validateData[propName].bsType, validateData[propName].required);
      const vData = getValidatorData(validateData[propName].bsType);
      const validators = validateData[propName].validators || [];
      this.formData[propName] = {
        required: validateData[propName].required || false,
        validators: [...srvValidators, ...validators],
        bsType: validateData[propName].bsType,
        maxLength: vData ? vData.maxLength : undefined,
        isActive: validateData[propName].isActive || true,
      }
    };
  }

  _setValidate(propName,val) {
    //при вывключении
    if (!val) {
      //Обнуляем сообщения об ошибках
      if (this.errors && this.errors[propName]) {
        this.errors[propName] = '';
      }
    } else {//при включении
      //провалидируем что в поле
      if (this.data && this.data[propName] != undefined) {
        this.errors[propName] = this.validateProp(this.data[propName], propName)
      }
    }
  }

  /** Включить/Выключить валидацию */
  setValivateActive(propName, value) {
    const val = !!value;
    if (this.formData && this.formData[propName]) {
      this.formData[propName].isActive = val;
    }
    this._setValidate(propName, val);
  }

  /** Включить/Выключить обязательность валидации */
  setValivateRequired(propName, value) {
    const val = !!value;
    if (this.formData && this.formData[propName]) {
      this.formData[propName].required = val;
    }
    this._setValidate(propName, val);
  }

  /**
   * Инициализация форм объекта
   * принимает объект со свойствами формата 
   * PROPNAME: { bsType: BSTYPE_VALUE,
   *  validators: VALIDATARS_VALUE,
   *  required:true|false }
   */
  initFormObservable() {
    if (this._validateDataProps.length === 0) {
      this._throwErr('initState пуст');
    }
    var errors = {};
    for (let p in this._validateDataProps) {
      const propName = this._validateDataProps[p];
      errors[propName] = '';
    }
    this.errors = observable(errors);

    for (let p in this._validateDataProps) {
      const propName = this._validateDataProps[p];
      /** Отслеживаем установку ошибки  в поле */
      reaction(
        () => this.errors[propName],
        err => {
          this.checkIsValid();
        },
      );
      /** Отслеживаем установку свойст в поле */
      reaction(
        () => this.data[propName],
        value => {
          this.errors[propName] = this.validateProp(value, propName);
        },
      );
      //При инициализации проводим валидацию. 
      this.errors[propName] = this.validateProp(this.data[propName], propName);
    }
    this.onFormObservableInit();
  }

}

export default BSMobxFormStore;

//import { observable, action } from "mobx";


const components = {};
const componentsFunc = {};

const validateInput = ({ componentClass, componentName, isSingleton = false }) => {

  if (typeof componentClass !== 'function') {
    throw new Error('Параметр 1 должен быть классом');
  }

  if (typeof isSingleton !== 'boolean') {
    throw new Error('Параметр 2 isSingleTon должен быть boolean');
  }

  if (!componentName) {
    throw new Error('Не задано имя компонента');
  }

  if (isSingleton && componentsFunc[componentName]) {
    throw new Error(`Компонент с именем ${componentName} уже зарегистрирована в DI контейнере`);
  }
};

const registerStore = (componentClass, componentName, isSingleton = false) => {
  validateInput({ componentClass, componentName, isSingleton });
  componentsFunc[componentName] = { ComponentClass: componentClass, isSingleton };
};

const getComp = (storeName) => {
  if (!storeName || typeof storeName !== 'string') {
    throw new Error('Некорректное имя компонента');
  }
  const storeData = componentsFunc[storeName];
  if (!storeData) {
    throw new Error(`Компонент с именем ${storeName} не зарегистрирован в DI контейнере`);
  }

  const regStore = components[storeName];
  if (regStore) {
    return regStore;
  }

  const store = new storeData.ComponentClass();

  if (storeData.isSingleton) {
    components[storeName] = store;
  }

  store._name = storeName;

  return store;
};

export { registerStore as regComp, getComp };

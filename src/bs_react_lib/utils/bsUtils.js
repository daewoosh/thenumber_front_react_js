import { Promise } from "es6-promise";
import clipboard from "clipboard-polyfill";



/** Удаление свойст объекта undefined и null */
export const removeEmptyProps = (obj) => {
  if (!obj || typeof obj != 'object') return;
  const props = Object.keys(obj);
  for (let prop in props) {
    if (obj[props[prop]] === undefined || obj[props[prop]] === null) {
      delete obj[props[prop]];
    }
  }
};

/** Определение мобильности платформы
 * Если определена window.cordova то считаем что это мобильная версия 
 */
export const isMobile = () => {
  return window.cordova !== undefined;
}

/** Помещение записи в буфер обмена
 * Результат Promise
 */
export const setClipboard = (str) => {
  if (!str || typeof (str) !== 'string') return;
  //const prom= new Promise()
  try {
    if (!isMobile()) {
      return clipboard.writeText(str)
    }
    else {
      if (window.cordova.plugins && window.cordova.plugins.clipboard) {
        var res = window.cordova.plugins.clipboard.copy(str,
          () => { },
          () => {
            throw "";
          });
        return Promise.resolve();
        // if (res!=-1) {
        //   //handleShareSuccess('Ссылка на рекомендацию скопирована в буфер обмена');
        //   return Promise.resolve();
        // }
        // else{
        //   throw "";
        // }
      }
    }
  } catch (err) {
    return Promise.reject(new Error(`Ошибка при копировании в буфер обмена: ${err}`));
  }
  return Promise.reject(new Error('Копирование в буфер обмена не поддерживается'));

}

/** Определение числа */
export const isNumber = (value, throwEx = false) => {

  if (Number.isNaN(Number(value))) {
    if (throwEx) {
      throw new Error(`value ${value} is not number`)
    }
    return false;
  }
  return true;
}

/** Замена  , на .  */
export const normalizeStringNumber = (value, throwEx = false) => {

  if (typeof (value) !== 'string') {
    if (throwEx) {
      throw new Error("incorrect value type")
    }
    return null;
  }
  return value.replace(',', '.')
}



export const round = (value, precision = 2, throwEx = false) => {

  if (typeof (value) === 'string') {
    value = Number(normalizeStringNumber(value));
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    if (throwEx) {
      throw new Error("incorrect value")
    }
    return null;
  }

  if (typeof (precision) !== 'number'
    || precision < 0) {
    if (throwEx) {
      throw new Error("incorrect precision")
    }
    return null;
  }
  const v = Math.pow(10, precision);
  return Math.round(value * v) / v;
  //return num.toFixed(precision);
}

export const roundCurrency = (value, currency, throwEx = false) => {

  if (!currency) {
    throw new Error("Not set currency");
  }
  let precision = 2;
  switch (currency.toLowerCase()) {
    case 'btc':
      precision = 6;
      break;
    case 'eth':
      precision = 8;
      break;
  }
  return round(value, precision, throwEx);
}

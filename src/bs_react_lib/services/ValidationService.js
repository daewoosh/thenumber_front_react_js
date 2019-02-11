const cult = {
  errMes: 'Сервис временно не доступен. Попробуйте позднее',
  sucMes: 'Операция выполнена успешно',
  htmlTemplate: {
    regex: /^[a-zA-Zа-яА-ЯёЁ0-9()\s\\,.!?:;%'"/-<>№@*_^#$=+&|-]*$/,
    maskRe: /[a-zA-Zа-яА-ЯёЁ0-9()?!\s\\,.<>/-]/,
    regexText: 'Некорректное значение',
    maxLength: 500,
  },
  textArea: {
    // regex: /^[a-zA-Zа-яА-ЯёЁ0-9()?!\s\\,./-]+$/g,
    // regex: /^[a-z]+$/g,
    regex: /^[a-zA-Zа-яА-ЯёЁ0-9()"]{1}[a-zA-Zа-яА-ЯёЁ0-9()\s\\,.!?:;%'"/-№@*_^#$=+&|-]*$/,
    maskRe: /[a-zA-Zа-яА-ЯёЁ0-9()?!\s\\,./-]/,
    regexText: 'Некорректное значение',
    maxLength: 500,
  },
  mailBody: {
    // regex: /^[a-zA-Zа-яА-ЯёЁ0-9()?!\s\\,./-]+$/g,
    // regex: /^[a-z]+$/g,
    regex: /^.+$/mg,
    maskRe: /.+/mg,
    regexText: 'Некорректное значение',
    maxLength: 500,
  },
  title: {
    regex: /^[a-zA-Zа-яА-ЯёЁ0-9()"]{1}[a-zA-Zа-яА-ЯёЁ0-9()\s\\,.!?:;%'"/-№@*_^#$=+&|-]*$/,
    maskRe: /[a-zA-Zа-яА-ЯёЁ0-9()?!\s\\,."/-]/,
    regexText: 'Некорректное значение',
    maxLength: 100,
  },
  num: {
    regex: /^[\d]*$/,
    maskRe: /\d/,
    regexText: 'Некорректное значение',
  },
  fio: {
    regex: /^[a-zA-Zа-яА-ЯёЁ0-9"]{1}[a-zA-Zа-яА-ЯёЁ0-9-]*$/,
    regexText: 'Некорректное значение',
    maskRe: /[А-ЯЁа-яё\- ]/,
    maxLength: 50,
  },
  date: {
    regex: /^[\d]{2}\.[\d]{2}\.[\d]{4}$/,
    maskRe: /[\d\\.]/,
    regexText: 'Некорректное значение',
    maxLength: 10,
  },
  KPP: {
    regex: /^\d{2}[0-9a-zA-Zа-яА-ЯёЁ]{2}[0-9A-Z]{2}\d{3}$/,
    maskRe: /[\da-zA-Zа-яА-ЯёЁ]/,
    regexText: 'Введите валидный КПП',
    maxLength: 9,
  },
  OGRN: {
    regex: /^[1235]\d{12}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный ОГРН',
    maxLength: 13,
  },
  INN: {
    regex: /^\d{10}|\d{12}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный ИНН',
    maxLength: 12,
  },
  INN10: {
    regex: /^\d{10}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный ИНН',
    maxLength: 10,
  },
  INN12: {
    regex: /^\d{12}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный ИНН',
    maxLength: 12,
  },
  SNILS: {
    regex: /^\d{11}$/,
    maskRe: /\d/,
    regexText: 'Введите корректный номер СНИЛС',
    maxLength: 11,
  },
  phone: {
    regex: /^[\d]{11}$/,
    maskRe: /^[\d]{0,9}$/,
    regexText: 'Введен неправильный номер телефона',
    requiredText: 'Введите номер',
    maxLength: 11,
  },
  email: {
    regex: /^([\da-zа-яё_\\.-])+@[\da-zа-яё-]+\.([a-zа-яё]{2,4}\.)?[a-zа-яё]{2,4}$/i,
    maskRe: /^[\da-zа-яё@_.\- ]{1,}$/i,
    regexText: 'Введен неправильный Email',
    requiredText: 'Введите E-mail',
    maxLength: 50,
  },
  password: {
    regex: /^[a-zA-Zа-яА-ЯёЁ0-9()"]{1}[a-zA-Zа-яА-ЯёЁ0-9()\s\\,."/-]*$/,
    maskRe: /[a-zA-Zа-яА-ЯёЁ0-9()?!\s\\,."/-]/,
    regexText: 'Пароль не соответствует требованиям',
    requiredText: 'Введите пароль',
    maxLength: 50,
  },
  BIK: {
    regex: /^\d{9}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный БИК',
    maxLength: 9,
  },
  account: {
    regex: /^\d{20}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный номер счета',
    maxLength: 20,
  },
  OKATO: {
    regex: /^\d{0,11}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный ОКАТО',
    maxLength: 11,
  },
  zipCode: {
    regex: /^\d{5}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный индекс',
    maxLength: 5,
  },
  street: {
    regex: /^[0-9A-Za-zА-ЯЁа-яё()\\,.\-\s]+$/,
    maskRe: /[0-9A-Za-zА-ЯЁа-яё()\\,.\-\s]/,
    regexText: 'Введите валидную улицу',
    maxLength: 100,
  },
  house: {
    regex: /^\d+$/,
    maskRe: /\d/,
    regexText: 'Введите валидный номер дома',
    maxLength: 9,
  },
  building: {
    regex: /^\d+$/,
    maskRe: /\d/,
    regexText: 'Введите валидное строение',
    maxLength: 9,
  },
  korpus: {
    regex: /^\d+$/,
    maskRe: /\d/,
    regexText: 'Введите валидный корпус',
    maxLength: 9,
  },
  litera: {
    regex: /^[а-яА-Я\\.-]+$/,
    maskRe: /[а-яА-Я\\.-]/,
    regexText: 'Введите валидную литеру',
    maxLength: 9,
  },
  room: {
    regex: /^\d+$/,
    maskRe: /\d/,
    regexText: 'Введите валидный номер комнаты',
    maxLength: 9,
  },
  decimal: {
    regex: /^\d+([,\\.])?\d*$/,
    maskRe: /[\d\\.,]/,
    regexText: 'Введите валидное число',
    maxLength: 9,
  },
  IP: {
    regex: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    maskRe: /[\d\\.]/,
    regexText: 'Введите валидный IP',
    maxLength: 11,
  },
  PaycardSerialNumber: {
    regex: /^\d{6}$/,
    maskRe: /\d/,
    regexText: 'Некорректный серийный номер карты',
    maxLength: 6,
  },
  PaycardSecretCode: {
    regex: /^\d{16}$/,
    maskRe: /\d/,
    regexText: 'Некорректный секретный код карты',
    maxLength: 16,
  },
  BIN: {
    regex: /^\d{12}$/,
    maskRe: /\d/,
    regexText: 'Введите валидный номер',
    maxLength: 12,
  },
  fioAndEmail: {
    regex: /^(([\da-zа-яёй_\\.-])+@[\da-zа-яёй-]+\.([a-zа-яёй]{2,4}\.)?[a-zа-яёй]{2,4}|[a-zа-яёй]+)$/i,
    regexText: 'Некорректное значение',
    maskRe: /^[\dA-Za-zА-ЯЁа-яё@.\- ]{1,}$/i,
    maxLength: 50,
  },
  money: {
    regex: /^[^-][\d]{0,7}([.|,][\d]{1,2})?$/,
    maskRe: /[\d\\.,]/,
    regexText: 'Некорректное значение',
  },
  bankName: {
    regex: /^[А-ЯЁ|а-яё|\d]+([ ][А-ЯЁ|а-яё|\d]+)?$/,
    regexText: 'Введине наименование банка',
    maxLength: 25,
  },
};

export default cult;

export const getCult = () => {
  return cult;
}
export const getValidatorData = (name) => {
  const val = cult[name];
  return !val ? null : val;
}

/**
 * Валидатор  required
 */
export const required = (value, bsType) => {
  const res = cult[bsType];
  const errorText = res && res.requiredText ? res.requiredText : 'Введите значение';
  return value ? undefined : errorText;
};

export const maxLength = max => (value) => {
  const result = value && value.length > max ? `Значение не должно быть больше ${max} символов` : undefined;
  return result;
};

export const minValue = min => (value) => {
  const result = value && value < min ? `Значение не должно быть меньше ${min} символов` : undefined;
  return result;
};

const validate = (value, bsType) => {
  const res = cult[bsType];
  if (!res) throw Error(`Не определено значение валидатора для типа ${bsType}`);
  return value && !res.regex.test(value)
    ? res.regexText || 'Некорректное значение'
    : undefined;
};

const _getValidators = (bsType, isRequired) => {
  const dataVal = cult[bsType];
  if (!dataVal && !dataVal.regex && !dataVal.maxLength) throw Error(`Не определено значение валидатора для типа ${bsType}`);
  const validators = [];
  if (isRequired) {
    validators.push(value => required(value, bsType));
  }
  if (dataVal.regex) {
    validators.push(value => validate(value, bsType));
  }
  if (dataVal.maxLength) {
    validators.push(maxLength(dataVal.maxLength));
  }
  return validators;
};

export const email = value => validate(value, 'email');

export const KPP = value => validate(value, 'KPP');

export const INN = value => validate(value, 'INN');

export const LegalINN = value => validate(value, 'LegalINN');

export const title = value => validate(value, 'title');

export const account = value => validate(value, 'account');

export const getValidators = (bsType, isRequired) => {

  /** Если ничего не задано то и нет валидаторов */
  if (!bsType && !isRequired) {
    return [];
  }
  /** если определен только isRequired */
  if (!bsType && isRequired) {
    return [value => required(value, bsType)];
  }

  const dataVal = cult[bsType];
  if (!dataVal && !dataVal.regex && !dataVal.maxLength) throw new Error(`Не определено значение валидатора для типа ${bsType}`);
  const validators = [];
  if (isRequired) {
    validators.push(value => required(value, bsType));
  }
  if (dataVal.regex) {
    validators.push(value => validate(value, bsType));
  }
  if (dataVal.maxLength) {
    validators.push(maxLength(dataVal.maxLength));
  }
  return validators;
};



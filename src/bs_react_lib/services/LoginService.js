import forge from 'node-forge';
// import randomstring from 'randomstring';
// import FormData from 'form-data';

import { add, get, clear } from './DataService';
import { getUserByLogin } from './WebAPI';
import { TOKEN_NAME } from '../constants';

// const usernameTemplate = 'ivanov@mail.ru';
// const passwordTemplate = '123456';

export const logout = () => {
  clear();
};

const getHash = (password, additionalStr) => {
  const md = forge.md.sha256.create();
  md.update(password);
  let hash = md.digest().toHex();
  hash += additionalStr;
  const md2 = forge.md.sha256.create();
  md2.update(hash);
  return md2.digest().toHex();
};

export const login = (username, password) => {
  logout();
  // const randomStr = randomstring.generate({
  //   length: 6,
  //   charset: 'alphanumeric',
  // });
  const randomStr = '';
  const hashPass = getHash(password, randomStr);
  const params = {
    login: username,
    password: hashPass,
    passwordKey: randomStr,
  };
  return getUserByLogin('POST', params)
    .then((data) => {
      add('userData', data.UserData.CustomerInfo);
      add('companyData', data.UserData.CompanyInfo);
      add('permissions', data.UserData.Permissions);
      add('userTypeId', data.UserData.SubjectTypeId);
      add(TOKEN_NAME, data.Token);
    });
  // return new Promise((successFunc, failFunc) => {
  //
  // });
};

export const isLogin = () => !!get(TOKEN_NAME) && !!get('userData');

export const isAdmin = () => get('companyData') && get('companyData').CompanyTypeId === 1;
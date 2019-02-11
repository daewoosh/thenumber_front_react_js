import axios from 'axios';
import formData from 'form-data-to-object';
import objectToFormData from 'object-to-formdata';

import { SERVICE_UNAVAILABLE, TOKEN_NAME } from '../constants';

import { add, get } from '../services/DataService';

const getFormData = (obj = {}, isNeedToken = true) => {
  const fd = Object.getOwnPropertyNames(obj).length !== 0 ? formData.fromObj(obj) : obj;
  if (isNeedToken) {
    fd.token = get(TOKEN_NAME);
  }
  return objectToFormData(fd);
};

/*
  BEELINE_PARTNER_WEB
  WEB_API methods
*/

const bsAjax = ({ url, sendMethod, params = {}, isNeedToken = true }) => {
  // const promise = fetch(url, {
  //   method: sendMethod || 'GET',
  //   body: getFormData(params, isNeedToken),
  // })
  const promise = axios({
    method: sendMethod || 'GET',
    url,
    data: getFormData(params, isNeedToken),
  })
    .then((response) => {
      if (response.status === 200) {
        // return response.json();
        return response.data;
      }
      throw Error(`${SERVICE_UNAVAILABLE} (${response.status})`);
    })
    .then((response) => {
      if (response && response.ErrorCode === 'AD') {
        document.location.hash = '/login';
        return;
      }
      if (response && response.Error) {
        throw Error(response.Error);
      }
      if (response.Data === undefined) {
        throw Error(SERVICE_UNAVAILABLE);
      }
      if (response.Error) {
        throw Error(response.data.Error);
      }
      if (response.Token) {
        add(TOKEN_NAME, response.Token);
      }
      return response.Data; // eslint-disable-line
    });
  return promise;
};

export default bsAjax;

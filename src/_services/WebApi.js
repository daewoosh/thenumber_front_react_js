import Promise from 'es6-promise';
import formData from 'form-data-to-object';
import objectToFormData from 'object-to-formdata';

import { API_PATH,CONFIRM_EMAIL,TOKEN_NAME } from '../_constants';
import { alertActions } from '../_actions';

import { add, get } from './DataService';


import bsAjaxMethod2 from 'bs_react_lib/utils/bsAjaxMethod';

const getFormData = (obj = {}, isNeedToken = true) => {    
    const fd = Object.getOwnPropertyNames(obj).length !== 0 ? formData.fromObj(obj) : obj;
    if (isNeedToken) {
        fd.token = get(TOKEN_NAME);
    }
    return objectToFormData(fd);
};

export const ajaxReq = (url, method, params = {}, isNeedToken = true) => {
    const requestOptions = {
        method: method || 'POST',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: getFormData(params, isNeedToken)
    };
    return fetch(`${API_PATH}/${url}`, requestOptions)
        .then(handleResponse);
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!data) {
            return Promise.reject(data.Error);
        }
        if (data.ErrorCode === 'AD') {
            document.location.hash = '/login';
            return Promise.reject(data.Error);
        }
        if (data.ErrorCode === 'EC') {
            document.location.hash = '/login';
            return Promise.reject(CONFIRM_EMAIL);
        }
        if (data.Error) {
            // dispatch(alertActions.error(data.Error.toString()));
            return Promise.reject(data.Error);
        }
        if (data.Token) {
            add(TOKEN_NAME, data.Token);
          }
        return data.Result;
    });
}

export const getUserByLogin = (method, params) => ajaxReq('Login', method, params, false);

export const registerUser = (method, params) => ajaxReq('Register', method, params, false);

export const getClientInfo = (params) => ajaxReq('GetUserInfo','POST',params,true);

export const saveClientInfo = (params) => ajaxReq('SaveCustomerInfo','POST',params,true);

export const confirmEmail = (params) => ajaxReq('ConfirmEmail','POST',params,false);

export const socialLogin = (params) => ajaxReq('SocialLogin','POST',params,false);

export const saveStep = (params) => ajaxReq('SaveStep','POST',params,true);
    
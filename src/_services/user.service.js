import { API_PATH, TOKEN_NAME } from '../_constants';
import { authHeader } from '../_helpers';

import { getUserByLogin, registerUser, getUserInfo, confirmEmail, socialLogin } from './WebApi'
import { add, get, remove, clear } from './DataService';
import { SuccessToast, ErrorToast } from '../_components/Notification';

export const userService = {
    login,
    logout,
    register,
    getInfo,
    emailConfirm,
    loginSocial
};

const onSuccessLogin = (data) => {
    add('userData', data.User);
    add(TOKEN_NAME, data.Token);
    document.location.hash = '/home';
    // history.Push('/');
};

const onSuccessRegister = (data) => {
    SuccessToast('Email отправлен на указанный адрес.Проверьте почту');
    document.location.hash = '/login';
    // history.Push('/');
};

const onSuccessConfirm = () => {
    SuccessToast('Email успешно подтвержден. Залогиньтесь');
    document.location.hash = '/login';
};

function login(username, password) {
    const params = {
        login: username,
        password: password,
        // passwordKey: randomStr,
    };
    const res = getUserByLogin('POST', params);
    res.then((data) => {
        onSuccessLogin(data);
    }).
        catch((err) => {
            debugger;
            ErrorToast(err);
        });
    return res;
}

function logout() {
    // remove user from local storage to log user out
    debugger;
    remove('userData');
    remove(TOKEN_NAME);
}

function getInfo() {
    const res = getUserInfo('POST', {});
    return res;
}

function register(user) {
    const params = {
        email: user.email,
        password: user.password,
        firstName: user.name,
        // passwordKey: randomStr,
    };
    const res = registerUser('POST', params);
    res.then((data) => {
        onSuccessRegister(data);
    })
        .catch((errMsg) => {
            ErrorToast(errMsg);
        });
    return res;
}


function emailConfirm(token) {
    const params = {
        confirmToken: token
    }
    const res = confirmEmail(params);
    res.then((data) => {
        onSuccessConfirm();
    })
        .catch((errMsg) => {
            ErrorToast(errMsg);
            document.location.hash = '/login';
        });
}

function loginSocial(provider) {
    const params = {
        providerName: provider
    }
    const res = socialLogin(params);
    res.then((data) => {
        console.log('url', data);
        const name = 'facebook_login';
        const specs = 'width=800,height=600';
        document.location = data;
        // const win = window.open(data, name, specs);
        // win.onclose = ErrorToast('UUU');
    })
        .catch((errMsg) => {
            ErrorToast(errMsg);
            document.location.hash = '/login';
        });
}

export const isLogin = () => !!get(TOKEN_NAME) && !!get('userData');
export const isProfileFilled = () => {
    var data = get('userData');
    debugger;
    return data.IsProfileFilled;
}
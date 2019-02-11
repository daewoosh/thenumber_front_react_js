import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { observable, action, toJS, computed } from 'mobx';
import { SuccessToast, ErrorToast } from '../_components/Notification';
import { ajaxReq } from '_services/WebApi';
import { getComp } from '../bs_react_lib/utils/bsDI';


const initState = {
    token: "",
    password: "",
    passwordConfirm: "",
}

export const saveNewPassword = (params) => {
    const res = ajaxReq('SaveNewPassword', 'POST', params, true)
    return res;
};


export default class NewPasswordStore extends BSMobxStore {
    constructor() {
        super({
            initState,
        })
    }

    savePassword() {
        const { token, password, passwordConfirm } = this.data;
        const params = {
            Password: password,
            PasswordConfirm: passwordConfirm,
            RecoveryToken: token,
        };

        var saveRes = saveNewPassword(params);
        saveRes
            .then(() => {
                SuccessToast('Пароль успешно сохранен');
                document.location.hash = '/login';
            })
            .catch((err) => {
                ErrorToast(err);
            });
    }
}

import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { observable, action, toJS, computed } from 'mobx';
import { SuccessToast, ErrorToast } from '../_components/Notification';
import { ajaxReq } from '_services/WebApi';
import { getComp } from '../bs_react_lib/utils/bsDI';

const initState = {
    login: "",
}

export const sendRecoveryEmail = (params) => {
    const res = ajaxReq('SendRecoveryEmail', 'POST', params, true)
    return res;
};



export default class PasswordRecoveryStore extends BSMobxStore {
    constructor() {
        super({
            action: () => { },
            initState,
        });
    }

    sendRecoveryEmail() {
        const { login } = this.data;
        const param = { email: login };
        var sendRes = sendRecoveryEmail(param);
        sendRes
            .then(() => 
            {
                SuccessToast('Емэйл со ссылкой успешно отправлен на указанный емэйл');
                var loginStore = getComp('LoginStore');
                loginStore.logout();
                //document.location.hash = '/login';
             })
            .catch((err) => { ErrorToast(err) });
    }
}
import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { observable, action, toJS, computed } from 'mobx';
import { userService } from '../_services';
import { add, get, remove, clear } from '../_services/DataService';
import { API_PATH, TOKEN_NAME } from '../_constants';

const initState = {
    login: "",
    password: "",
}



export default class LoginStore extends BSMobxStore {
    constructor() {
        super({
            // action: () => { },
            initState,
        });
    }

    @observable
    isLoggedIn = !!get(TOKEN_NAME) && !!get('userData');

    @observable
    userId = 0;

    @computed get userInfo() {
        if (this.isLoggedIn === true)
            return get('userData');
        else
            return null;
    }

    @computed get FullName() {
        if (this.userInfo)
            return this.userInfo.FirstName;
        else
            return 'Hello';
    }

    loginUser() {
        const { login, password } = this.data;
        userService.login(login, password).then((data) => {
            this.isLoggedIn = true;
        }).catch((err) => this.isLoggedIn = false);
    };

    logout() {
        remove('userData');
        remove(TOKEN_NAME);
        this.isLoggedIn = false
        document.location.hash = '/login';
    }
}
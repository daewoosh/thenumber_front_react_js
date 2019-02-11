import React from 'react';
import './Header.less';
import { API_PATH, CONFIRM_EMAIL, TOKEN_NAME } from '../../_constants';
import { observer } from 'mobx-react';
import { getComp } from '../../bs_react_lib/utils/bsDI';

@observer
export class HeaderLogin extends React.Component {
    constructor(props) {
        super(props);
        this.loginStore = getComp('LoginStore');
        this.commonStore = getComp('CommonStore');
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        this.loginStore.logout();
    }


    handleRegisterClick = () => {
        document.location.hash = '/register';
    }

    handleLoginClick = () => {
        document.location.hash = '/login';
    }
    getUserInfoView = (userInfo) => {
        const { changeAvatar } = this.commonStore;
        const avatarUrl = changeAvatar !== false ?
            `${API_PATH}/getuseravatar?userId=${userInfo.Id}&refresh=${new Date().getTime()}` :
            `${API_PATH}/getUserAvatar?userId=${userInfo.Id}&refresh=${new Date().getTime()}`
        // debugger;
        // const avatarUrl = `${API_PATH}/getUserAvatar?userId=${userInfo.Id}`
        return (
            <div className="header-user-info">
                <a className="header-user-link" href={`${window.location.pathname}#/profile`} title="Ваш профиль">
                    <img className="user-info-avatar" src={avatarUrl} />
                    <span className="user-info-fullname">{this.loginStore.FullName}</span>
                </a>
                <a className="exit-btn" onClick={this.handleLogout} title="Выйти"> <img src="assets/img/log_out.svg" /> </a>
            </div>
        );
    }

    getButtonsView = () => {
        return (
            <div>
                <button className="register" onClick={this.handleRegisterClick}>Зарегистрироваться</button>
                <button className="register white-btn" onClick={this.handleLoginClick}>Войти</button>
            </div>
        );
    }

    render() {
        const userInfo = this.loginStore.userInfo;
        let view;
        if (userInfo)
            view = this.getUserInfoView(userInfo);
        else
            view = this.getButtonsView();
        return (
            <div className="header-user">
                {view}
            </div>
        );
    }
}
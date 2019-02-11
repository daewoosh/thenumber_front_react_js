import React from 'react';
import { Link } from 'react-router-dom';

import { userActions } from '../_actions';
import { userService } from '../_services';
import { SuccessToast, ErrorToast } from '../_components/Notification';

import { observer } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';

import LoginSocial from '../_components/LoginSocial';

@observer
export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.loginStore = getComp('LoginStore');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSocialClick = this.handleSocialClick.bind(this);
        this.initVk();
    }



    initVk = () => {
        window.VK.init({
            apiId: '6483201'
        });
    }

    handleSocialClick(provider) {
        userService.loginSocial(provider);
        //     const loginHandler = (response)=> {console.log('vk',response)};
        //     debugger;
        //    var res= window.VK.Auth.login(loginHandler,4194304);

    }



    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.loginStore.data[name] = value;
    }

    handleSubmit(e) {
        e.preventDefault();
        debugger;
        this.loginStore.loginUser();
    }



    render() {
        const { loggingIn } = this.props;
        const { username, submitted } = this.state;
        const { login, password } = this.loginStore;
        return (

            <div className="login">
                <div className="panel-narrow">
                    <div className="panel-narrow-content">
                        <span className="panel-header">Войти</span>
                        <form name="form" onSubmit={this.handleSubmit} className="panel-form">
                            <div className={'form-group' + (submitted && !username ? ' has-error' : '') + ' panel-form-group'}>
                                <label htmlFor="login">Электронная почта</label>
                                <input type="text" className="form-control" name="login" value={login} onChange={this.handleChange} />
                                {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '') + ' panel-form-group'}>
                                <label htmlFor="password">Пароль</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <Link to="/recovery" >Забыли пароль?</Link>
                            <div className="form-group">
                                <button className="button-wide">Войти</button>
                                {loggingIn &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }

                            </div>
                            {/* <LoginSocial/> */}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

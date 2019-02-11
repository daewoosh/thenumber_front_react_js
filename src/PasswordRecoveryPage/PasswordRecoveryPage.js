import React from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';


@observer
export class PasswordRecoveryPage extends React.Component {
    constructor(props) {
        super(props);
        this.passRecoveryStore = getComp('PasswordRecoveryStore');
        this.handleChange = this.handleChange.bind(this);
      //  this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit =(e)=> {
        e.preventDefault();
        debugger;
        this.passRecoveryStore.sendRecoveryEmail();
        // this.setState({ submitted: true });
        // const { username, password } = this.state;
        // const { dispatch } = this.props;
        // if (username && password) {
        //     dispatch(userActions.login(username, password));
        //}
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.passRecoveryStore.data[name] = value;
    }

    render() {
        const { login } = this.passRecoveryStore;
        return (
            <div className="recovery">
                <div className="panel-narrow">
                    <div className="panel-narrow-content">
                        <span className="panel-header">Восстановление пароля</span>
                        <form name="form" className="panel-form">
                            <div className={'form-group panel-form-group'}>
                                <label htmlFor="username">Электронная почта</label>
                                <input type="text" className="form-control" name="login" value={login} onChange={this.handleChange} />
                                {/* {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                } */}
                            </div>
                            <div className="form-group">
                                <button className="button-wide" onClick={this.handleSubmit}>Восстановить</button>
                            </div>
                            <div className="centered-link">
                                <Link to="/login">Вернуться к авторизации</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
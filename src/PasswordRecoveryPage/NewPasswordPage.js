import React from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import NewPasswordStore from './NewPasswordStore'

@observer
export class NewPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = { token: this.props.match.params.token };
        this.store = new NewPasswordStore();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { token } = this.state;
        this.store.data['token'] = token;
        //TODO если токен не валидный то перенаправлять куда нибудь.
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.store.data[name] = value;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.store.savePassword();
    }

    render() {
        const { password, passwordConfirm } = this.store.data;
        return (
            <div className="recovery">
                <div className="panel-narrow">
                    <div className="panel-narrow-content">
                        <span className="panel-header">Восстановление пароля</span>
                        <form name="form" className="panel-form">
                            <div className={'form-group panel-form-group'}>
                                <label htmlFor="password">Пароль</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group panel-form-group'}>
                                <label htmlFor="passwordConfirm">Подтверждение пароля</label>
                                <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <button className="button-wide" onClick={this.handleSubmit}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

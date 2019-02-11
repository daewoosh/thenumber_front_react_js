import React from 'react';
import { connect } from 'react-redux';
import LoginSocial from '../_components/LoginSocial';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
                name: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="registration">
                <div className="panel-narrow">
                    <div className="panel-narrow-content">
                        <span className="panel-header">Регистрация</span>
                        <form name="form" onSubmit={this.handleSubmit} className="panel-form">
                            <div className={'form-group panel-form-group'}>
                                <label htmlFor="name">Имя</label>
                                <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
                                {submitted && !user.name &&
                                    <div className="help-block">email is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '') + ' panel-form-group'}>
                                <label htmlFor="email">Электронная почта</label>
                                <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                {submitted && !user.email &&
                                    <div className="help-block">email is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '') + ' panel-form-group'}>
                                <label htmlFor="password">Пароль</label>
                                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="agreement-checkbox">
                                <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
                                <label for="subscribeNews">Согласен с правилами и условиями</label>
                            </div>
                            <div className="form-group">
                                <button className="button-wide">Зарегистрироваться</button>
                            </div>
                            {/* <LoginSocial/> */}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
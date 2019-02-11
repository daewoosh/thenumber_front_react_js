import React from 'react';

class LoginSocial extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="login-social">
                <div className="login-social-title">
                    <hr/>
                    <span>или войти через</span>
                    <hr/>
                </div>
                <div className="form-group">
                    <button className="white-btn _social">
                        <img src="./assets/img/login-facebook.svg" />
                        <span>Войти через Facebook</span>
                    </button>
                    <button className="white-btn _social">
                        <img src="./assets/img/login-google.svg" />
                        <span>Войти через Google</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default LoginSocial;
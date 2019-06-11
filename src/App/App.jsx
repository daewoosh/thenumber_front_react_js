import React from 'react';
import { Router, Route, HashRouter, Link, Redirect, Switch } from 'react-router-dom';
import { IndexRoute } from 'react-router'
import { connect } from 'react-redux';
import { Header } from '../_components';
import { Footer } from '../_components';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import PrivateRoute from '../_components/PrivateRoute';
import { HomePage } from '../HomePage';
import { LoginPage, AuthSuccess } from '../LoginPage';
import { RegisterPage, EmailConfirmation } from '../RegisterPage';
import { PasswordRecoveryPage, NewPasswordPage } from '../PasswordRecoveryPage';
import { UserProfilePage } from '../UserProfilePage';
import { add, get, remove, clear } from '../_services/DataService';
import { API_PATH, TOKEN_NAME } from '../_constants';
import { Dashboard } from '../Dashboard';
import { FinancePage } from '../FinancePage';
import { BudgetPage } from '../BudgetPage';
import { UserAimsPage } from '../AimsPage';
import { ToastContainer, toast } from 'react-toastify';
import { StartWizardPage } from '../StartWizardPage';
import 'react-toastify/dist/ReactToastify.css';
// import {NewPasswordPage} from '../PasswordRecoveryPage/NewPasswordPage';

import { isLogin, logout } from '../_services/user.service';

import '../_stores';

import '../styles/default.less';

export class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });

        // const userStore = getComp('ClientInfoStore');
        // userStore = new ClientInfoStore();
    };


    render() {
        return (
            <div className="main-container">
                <Header />
                <HashRouter>
                    <div className="content">
                        {/* <Redirect exact from="/" to="/home" /> */}
                        {/* <IndexRoute component={Dashboard} /> */}
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute exact path="/home" component={Dashboard} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/confrimEmail/:token"
                                component={EmailConfirmation} />
                            <Route path="/newPassword/:token"
                                component={NewPasswordPage} />
                            <Route path="/socialauth" component={AuthSuccess} />
                            <Route path="/recovery" component={PasswordRecoveryPage} />
                            <PrivateRoute path="/profile" component={UserProfilePage} />
                            <PrivateRoute path="/old" component={HomePage} />
                            <PrivateRoute path="/finance" component={FinancePage} />
                            <PrivateRoute path="/budget" component={BudgetPage} />
                            <PrivateRoute path="/aims" component={UserAimsPage} />
                            <Route path="/startWizard" component={StartWizardPage} />
                        </Switch>
                    </div>
                </HashRouter>
                <Footer />
                <ToastContainer />
            </div>
        );
    }
}

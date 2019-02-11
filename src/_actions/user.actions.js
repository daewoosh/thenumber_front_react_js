import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getInfo
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    window.location.hash = '/home';
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {

                    dispatch(success());
                    debugger;
                    dispatch(alertActions.success(`Registration successful. Email was sent to ${user.Email}`));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function getInfo() {
    return dispatch => {
        userService.getInfo()
            .then(
                user => {
                    debugger;
                    dispatch(success(user));
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }

            );
    };
    function success(user) { return { type: userConstants.GET_INFO_SUCCESS, user } }
}

function saveInfo(user) {
    return dispatch => {
        dispatch(request(user));
        userService.saveInfo(user)
            .then(
                function success(user) { return { type: userConstants.GET_INFO_SUCCESS, user } }
            );
    };
};



// prefixed function name with underscore because delete is a reserved word in javascript

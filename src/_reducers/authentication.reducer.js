import { userConstants } from '../_constants';
import objectAssign from 'object-assign';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return objectAssign({}, state, { loggingIn: true, user: action.user });
    case userConstants.LOGIN_SUCCESS:
      return objectAssign({}, state, { loggedIn: true, user: action.user });
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
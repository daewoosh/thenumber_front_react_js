import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin, isProfileFilled } from '../_services/user.service';

const PrivateRoute = (props) => {
  const renderComponent = (p) => {
    if (!isLogin()) {
      return (<Redirect to="/login" />);
    }
    //  if (props.ignoreProfileFilled && props.ignoreProfileFilled == 'false')
    var isFilled = isProfileFilled();
    debugger;
    if (isFilled===false) {
      return (<Redirect to="/startWizard" />);
    }
    if (props.master) {
      const MasterComponent = props.master;
      return (<MasterComponent
        component={props.component}
        match={p.match}
        location={p.location}
        history={p.history}
        actions={props.actions}
      />
      );
    }
    const Component = props.component;
    return (<Component
      match={p.match}
      location={p.location}
      history={p.history}
      actions={props.actions}
    />
    );
  };
  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={renderComponent}
    >
      {props.children}
    </Route>
  );
};

export default PrivateRoute;
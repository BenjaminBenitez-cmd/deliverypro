import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const HiddenOnLogin = ({ render, ...rest }) => {
    const isAuth = useSelector(state => state.user.isLoggedIn);
    const Component = render;
    return (
        <Route {...rest} render={ props => (
            !isAuth ? (
              <Component {...props} {...rest}/>
            ) : (
              <Redirect
                to={{
                  pathname: "/admin/dashboard",
                  state: { from: props.location }
                }}
              />
            )
          )}/>
    )
}

export default HiddenOnLogin;
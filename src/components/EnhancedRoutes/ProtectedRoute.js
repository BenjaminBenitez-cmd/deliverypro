import { logOutAction } from 'features/auth/AuthSlice';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getUserFromLocalStorage } from 'utilities/utilities';


const checkAuth = () => {
  const user = getUserFromLocalStorage();
  if(!user){
      return false;
  }
  try {
      const { exp } = jwtDecode(user.token);
      if (exp < new Date().getTime() / 1000){
          return false;
      }
  } catch (e) {
      return false;
  }

  return true;
}

const ProtectedRoute = ({ render, ...rest }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isLoggedIn);
    const Component = render;
    useEffect(() => {
      if(!checkAuth()){
        dispatch(logOutAction());
      }
    }, [])
    return (
        <Route {...rest} render={ props => (
            isAuth ? (
              <Component {...props} {...rest}/>
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )
          )}/>
    )
}

export default ProtectedRoute;
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import Signin from "layouts/Authentication/Signin";

import store from "./store";
import { Provider } from "react-redux";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import ProtectedRoute from "components/EnhancedRoutes/ProtectedRoute";
import { getUserFromLocalStorage } from "utilities/utilities";
import { authenticate } from "redux/auth/AuthSlice";
import HiddenOnLogin from "components/EnhancedRoutes/HiddenOnLogin";
import Verification from "layouts/Customers/Verification";
import Signup from "layouts/Authentication/Signup";
import SignupAuthenticate from "layouts/Authentication/SignupVerify";

const user = getUserFromLocalStorage();

if (user) {
  store.dispatch(authenticate());
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <HiddenOnLogin
              path="/authenticate/:token"
              render={(props) => <SignupAuthenticate {...props} />}
            />
            <HiddenOnLogin
              path="/signup"
              render={(props) => <Signup {...props} />}
            />
            <HiddenOnLogin
              path="/signin"
              render={(props) => <Signin {...props} />}
            />
            <Route
              path="/verifyaddress/:token"
              render={(props) => <Verification {...props} />}
            />
            <ProtectedRoute
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </Provider>,
  document.getElementById("root")
);

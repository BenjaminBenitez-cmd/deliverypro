import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

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
            <ProtectedRoute
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <HiddenOnLogin
              path="/signin"
              render={(props) => <Signin {...props} />}
            />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </Provider>,
  document.getElementById("root")
);

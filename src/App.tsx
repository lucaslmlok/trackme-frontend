import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AuthPage from "./pages/auth/AuthPage";
import NavWrapper from "./containers/NavWrapper";
import TrackingPage from "./pages/tracking/Page";
import ActionPage from "./pages/actions/ActionPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";

import * as authActions from "./redux/actions/auth";
import { State } from "./redux/store.d";
import Loading from "./components/Loading";

const GuardedRoute = ({ children, auth, redirect, ...rest }) => (
  <Route
    {...rest}
    render={() => (auth ? children : <Redirect to={redirect} />)}
  />
);

const App = () => {
  const dispatch = useDispatch();
  const { token, tokenCheck } = useSelector((state: State) => state.auth);

  useEffect(() => {
    dispatch(authActions.tokenLogin());
  }, []);

  if (!tokenCheck) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <GuardedRoute path="/tracking" auth={!!token} redirect="/">
          <NavWrapper pageTitle="Tracking">
            <TrackingPage />
          </NavWrapper>
        </GuardedRoute>
        <GuardedRoute path="/actions" auth={!!token} redirect="/">
          <NavWrapper pageTitle="Actions">
            <ActionPage />
          </NavWrapper>
        </GuardedRoute>
        <GuardedRoute path="/dashboard" auth={!!token} redirect="/">
          <NavWrapper pageTitle="Dashboard">
            <DashboardPage />
          </NavWrapper>
        </GuardedRoute>
        <GuardedRoute path="/account" auth={!!token} redirect="/">
          <NavWrapper pageTitle="Account">
            <AccountPage />
          </NavWrapper>
        </GuardedRoute>
        <GuardedRoute path="/" exact auth={!token} redirect="/tracking">
          <AuthPage />
        </GuardedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

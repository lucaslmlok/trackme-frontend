import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import AuthPage from "./pages/auth/AuthPage";
import NavWrapper from "./components/nav/NavWrapper";
import TrackingPage from "./pages/tracking/TrackingPage";
import ActionPage from "./pages/actions/ActionPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/account/AccountPage";

import * as authActions from "./redux/actions/auth";
import { State } from "./redux/redux";
import Loading from "./components/ui/Loading";

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
          <Helmet>
            <title>Tracking | Trackme - Track Your Life Seamlessly.</title>
          </Helmet>
          <NavWrapper pageTitle="Tracking">
            <TrackingPage />
          </NavWrapper>
        </GuardedRoute>
        <GuardedRoute path="/actions" auth={!!token} redirect="/">
          <Helmet>
            <title>Actions | Trackme - Track Your Life Seamlessly.</title>
          </Helmet>
          <NavWrapper pageTitle="Actions">
            <ActionPage />
          </NavWrapper>
        </GuardedRoute>
        <GuardedRoute path="/dashboard" auth={!!token} redirect="/">
          <Helmet>
            <title>Dashboard | Trackme - Track Your Life Seamlessly.</title>
          </Helmet>
          <NavWrapper pageTitle="Dashboard">
            <DashboardPage />
          </NavWrapper>
        </GuardedRoute>
        <GuardedRoute path="/account" auth={!!token} redirect="/">
          <Helmet>
            <title>Account | Trackme - Track Your Life Seamlessly.</title>
          </Helmet>
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

import React from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

import "./index.css";
import App from "./App";
import store from "./redux/store";
import theme from "./utils/theme";
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>Trackme - Track Your Life Seamlessly.</title>
          <meta
            name="description"
            content="A productivity tools helps people monitor their and do their best work by being effective."
          />
        </Helmet>
        <App />
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

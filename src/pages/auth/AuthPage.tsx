import { CssBaseline, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AuthBanner from "./components/AuthBanner";
import AuthForm from "./components/AuthForm";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
}));

const AuthPage = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={7}>
        <AuthBanner />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <AuthForm />
      </Grid>
    </Grid>
  );
};

export default AuthPage;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import GitHubIcon from "@material-ui/icons/GitHub";

import ToastMsg from "../../../components/ui/ToastMsg";
import Copyright from "../../../components/ui/Copyright";
import { errorText, getErrorData } from "../../../utils/helper";
import * as authActions from "../../../redux/actions/auth";
import config from "../../../utils/config";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const AuthForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const error: any = await dispatch(
      authActions.authIn(formData, isLogin, rememberMe)
    );

    if (error) {
      const body = getErrorData(error.data);
      toast.error(<ToastMsg title={error.message} body={body} />);
      setIsLoading(false);
    } else {
      history.push("/tracking");
    }
  };

  return (
    <div className={classes.paper}>
      <Box display="flex" width={1} justifyContent="space-between" mb={2}>
        <Button color={isLogin ? "primary" : "secondary"} onClick={toggleMode}>
          Switch to {isLogin ? "Sign Up" : "Log In"}
        </Button>
        <Link href={config.githubRepo} target="_blank" rel="noopener">
          <IconButton>
            <GitHubIcon color="primary" style={{ fontSize: 30 }} />
          </IconButton>
        </Link>
      </Box>
      <Avatar
        className={classes.avatar}
        style={{
          backgroundColor:
            theme.palette[isLogin ? "secondary" : "primary"].main,
        }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {isLogin ? "Log In" : "Sign Up"}
      </Typography>
      {isLogin ? (
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  name="email"
                  control={control}
                  defaultValue=""
                  type="email"
                  fullWidth
                  required
                  autoComplete="email"
                  label="Email Address"
                  error={!!errors?.email}
                  helperText={errorText(errors, "email")}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  name="password"
                  control={control}
                  defaultValue=""
                  type="password"
                  fullWidth
                  required
                  autoComplete="current-password"
                  label="Password"
                  error={!!errors?.password}
                  helperText={errorText(errors, "password")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label="Remember me"
                  control={
                    <Checkbox
                      onChange={() => setRememberMe(!rememberMe)}
                      checked={rememberMe}
                      color="secondary"
                    />
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="secondary"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Log In"}
          </Button>
        </form>
      ) : (
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="firstName"
                  control={control}
                  defaultValue=""
                  fullWidth
                  required
                  autoComplete="given-name"
                  label="First Name"
                  error={!!errors?.firstName}
                  helperText={errorText(errors, "firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="lastName"
                  control={control}
                  defaultValue=""
                  fullWidth
                  required
                  autoComplete="family-name"
                  label="Last Name"
                  error={!!errors?.lastName}
                  helperText={errorText(errors, "lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  name="email"
                  control={control}
                  defaultValue=""
                  type="email"
                  fullWidth
                  required
                  autoComplete="email"
                  label="Email Address"
                  error={!!errors?.email}
                  helperText={errorText(errors, "email")}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  name="password"
                  control={control}
                  defaultValue=""
                  type="password"
                  fullWidth
                  required
                  autoComplete="current-password"
                  label="Password"
                  error={!!errors?.password}
                  helperText={errorText(errors, "password")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label="Remember me"
                  control={
                    <Checkbox
                      onChange={() => setRememberMe(!rememberMe)}
                      checked={rememberMe}
                      color="primary"
                    />
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Sign Up"}
          </Button>
        </form>
      )}

      <Grid container>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={toggleMode}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account ? Log In"}
          </Button>
        </Grid>
      </Grid>
      <Copyright />
    </div>
  );
};

export default AuthForm;

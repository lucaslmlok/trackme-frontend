import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { State } from "../../../redux/redux";
import { authHeaders, errorText, getErrorData } from "../../../utils/helper";
import useMobile from "../../../hooks/useMobile";
import urls from "../../../utils/urls";
import Title from "../../../components/ui/Title";
import ToastMsg from "../../../components/ui/ToastMsg";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const schema = yup.object().shape({
  currentPassword: yup.string().required(),
  newPassword: yup.string().required().min(4),
  confirmNewPassword: yup.string().required(),
});

const PasswordForm = () => {
  const classes = useStyles();
  const isMobile = useMobile();
  const [confirmError, setConfirmError] = useState(false);
  const state = useSelector((state: State) => state);

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const { currentPassword, newPassword, confirmNewPassword } = formData;
    if (newPassword !== confirmNewPassword) {
      setConfirmError(true);
      return;
    }
    setConfirmError(false);
    setLoading(true);

    try {
      const { data } = await axios.put(
        urls.changePassword,
        { currentPassword, newPassword },
        { headers: authHeaders(state) }
      );
      toast.success(<ToastMsg title={data.message} body={data.body} />);
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("confirmNewPassword", "");
    } catch (error) {
      const result = error.response.data;
      const body = getErrorData(result.data);
      toast.error(<ToastMsg title={result.message} body={body} />);
    }
    setLoading(false);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Paper className={classes.paper}>
        <Title>Change Password</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              You can change your account password here.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="currentPassword"
                  label="Current Password"
                  control={control}
                  defaultValue=""
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  error={!!errors?.currentPassword}
                  helperText={errorText(errors, "currentPassword")}
                />
              </Grid>

              {!isMobile && <Grid item xs={12} sm={6}></Grid>}

              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="newPassword"
                  label="New Password"
                  control={control}
                  defaultValue=""
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  error={!!errors?.newPassword}
                  helperText={errorText(errors, "newPassword")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  control={control}
                  defaultValue=""
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  error={!!errors?.confirmNewPassword || confirmError}
                  helperText={
                    confirmError
                      ? "Please make sure your passwords match"
                      : errorText(errors, "confirmNewPassword")
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Loading" : "Change Password"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default PasswordForm;

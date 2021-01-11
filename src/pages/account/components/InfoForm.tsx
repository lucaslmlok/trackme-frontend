import { useEffect, useState } from "react";
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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
});

const InfoForm = () => {
  const classes = useStyles();
  const { control, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const state = useSelector((state: State) => state);
  const { token } = state.auth;

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        urls.changeInfo,
        { ...formData },
        { headers: authHeaders(state) }
      );
      toast.success(<ToastMsg title={data.message} body={data.body} />);
    } catch (error) {
      const result = error.response.data;
      const body = getErrorData(result.data);
      toast.error(<ToastMsg title={result.message} body={body} />);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await axios.get(urls.getInfo, {
          headers: authHeaders(state),
        });
        setValue("firstName", data.firstName);
        setValue("lastName", data.lastName);
        setValue("email", data.email);
      } catch (error) {
        const result = error.response.data;
        const body = getErrorData(result.data);
        toast.error(<ToastMsg title={result.message} body={body} />);
      }
    };

    if (token) fetchInfo();
  }, [token]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Paper className={classes.paper}>
        <Title>Personal Information</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              You can update your personal information here.
              <br />
              Email cannot be changed once account is created.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  control={control}
                  defaultValue=""
                  required
                  fullWidth
                  variant="outlined"
                  error={!!errors?.firstName}
                  helperText={errorText(errors, "firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  control={control}
                  defaultValue=""
                  required
                  fullWidth
                  variant="outlined"
                  error={!!errors?.lastName}
                  helperText={errorText(errors, "lastName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={TextField}
                  name="email"
                  label="Email Address"
                  control={control}
                  defaultValue=""
                  required
                  fullWidth
                  variant="outlined"
                  disabled
                  error={!!errors?.email}
                  helperText={errorText(errors, "email")}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Loading" : "Update"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default InfoForm;

import { Grid } from "@material-ui/core";

import InfoForm from "./components/InfoForm";
import PasswordForm from "./components/PasswordForm";
import DeleteForm from "./components/DeleteForm";

const AccountPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <InfoForm />
      </Grid>
      <Grid item xs={12}>
        <PasswordForm />
      </Grid>
      <Grid item xs={12}>
        <DeleteForm />
      </Grid>
    </Grid>
  );
};

export default AccountPage;

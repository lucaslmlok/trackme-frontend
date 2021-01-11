import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Title from "../../../components/ui/Title";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const schema = yup.object().shape({
  password: yup.string().required(),
});

const DeleteForm = () => {
  const classes = useStyles();
  const [deleteDialog, setDeleteDialog] = useState(false);

  const deleteAccount = async () => {};

  return (
    <>
      <Paper className={classes.paper}>
        <Title>Delete Account</Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteAccount}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteForm;

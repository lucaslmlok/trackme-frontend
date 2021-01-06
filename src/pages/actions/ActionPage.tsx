import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormGroup,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TransitionProps } from "@material-ui/core/transitions";

import ActionForm from "./components/ActionForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    fab: {
      position: "absolute",
      zIndex: 1,
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const list = new Array(10).fill("abc");

export default function FolderList() {
  const classes = useStyles();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullScreen={mobile}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Action
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <ActionForm />
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDeleteClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt={-1} pb={2} display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          color="secondary"
          disabled
          startIcon={<DeleteIcon />}
        >
          Delete Selected
        </Button>
      </Box>
      <List className={classes.root}>
        {list.map((_, index) => (
          <>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem button key={index}>
              <ListItemIcon>
                <Checkbox checked={false} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              <ListItemSecondaryAction>
                <IconButton
                  size={mobile ? "small" : "medium"}
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge={mobile ? "end" : false}
                  size={mobile ? "small" : "medium"}
                  aria-label="delete"
                  onClick={handleClickDeleteOpen}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
}

import { useState } from "react";
import { Fab, Box, Paper, Backdrop } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import ActionCalendar from "./components/ActionCalendar";
import ActionList from "./components/ActionList";

const useStyles = makeStyles((theme) => ({
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
}));

const TrackingPage = () => {
  const classes = useStyles();

  const [backdropOpen, setBackdropOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setBackdropOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Box overflow="hidden" borderRadius={5}>
        <Paper elevation={0}>
          <ActionCalendar />
          <ActionList />
        </Paper>
      </Box>
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={() => setBackdropOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default TrackingPage;

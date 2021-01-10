import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Fab, Box, Paper, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import TrackCalendar from "./components/TrackCalendar";
import TrackingList from "./components/TrackingList";
import * as trackingActions from "../../redux/actions/tracking";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    zIndex: 1,
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

const TrackingPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const addAction = () => {
    history.push("/actions?type=form");
  };

  useEffect(() => {
    dispatch(trackingActions.fetchRecords());
  }, []);

  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={addAction}
      >
        <AddIcon />
      </Fab>
      <Box borderRadius={4}>
        <Paper elevation={0}>
          <TrackCalendar />
          <TrackingList />
        </Paper>
      </Box>
    </>
  );
};

export default TrackingPage;

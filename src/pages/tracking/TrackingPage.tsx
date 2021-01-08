import { useHistory } from "react-router-dom";
import { Fab, Box, Paper, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import ActionCalendar from "./components/ActionCalendar";
import ActionList from "./components/ActionList";

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

  const addAction = () => {
    history.push("/actions?type=add");
  };

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
      <Box overflow="hidden" borderRadius={4}>
        <Paper elevation={0}>
          <ActionCalendar />
          <ActionList />
        </Paper>
      </Box>
    </>
  );
};

export default TrackingPage;

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import { State } from "../../../redux/redux";
import ActionCard from "./ActionCard";
import * as trackActions from "../../../redux/actions/tracking";
import useMobile from "../../../hooks/useMobile";

const ActionList = () => {
  const history = useHistory();
  const isMobile = useMobile();

  const dispatch = useDispatch();
  const { recordList, recordLoading, recordError } = useSelector(
    (state: State) => state.tracking
  );

  const tryAgain = () => {
    dispatch(trackActions.fetchRecords());
  };

  const addAction = () => {
    history.push("/actions?type=form");
  };

  return (
    <Box p={isMobile ? 2 : 4}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {recordList.map((record) => (
          <Grid key={record.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ActionCard record={record} />
          </Grid>
        ))}
        {recordList.length === 0 && (
          <Box
            width={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            py={5}
          >
            {recordLoading && <CircularProgress color="secondary" />}
            {recordError && (
              <>
                <Typography color="textSecondary">
                  There was an error in loading your records.
                </Typography>
                <Button
                  color="secondary"
                  onClick={tryAgain}
                  style={{ marginTop: 15 }}
                >
                  Try Again
                </Button>
              </>
            )}
            {!recordLoading && !recordError && (
              <>
                <Typography color="textSecondary">
                  There are no actions available on this day.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={addAction}
                  style={{ marginTop: 15 }}
                >
                  Add One
                </Button>
              </>
            )}
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ActionList;

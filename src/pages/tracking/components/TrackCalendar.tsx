import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ButtonBase,
  Box,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CheckIcon from "@material-ui/icons/CheckCircle";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import * as colors from "@material-ui/core/colors";

import config from "../../../utils/config";
import { State } from "../../../redux/redux";
import * as trackingActions from "../../../redux/actions/tracking";

const useStyles = makeStyles((theme) => ({
  calendar: {
    backgroundColor: theme.palette.primary.main,
  },
  navigateButton: {
    color: "white",
  },
  datePicker: {
    display: "none",
  },
  dateButtonInner: {
    width: 120,
    padding: 4,
  },
  todayBtn: {
    position: "absolute",
    zIndex: 1,
    top: -50,
    right: 0,
  },
  done: {
    position: "absolute",
    zindex: 1,
    right: 4,
    top: 45,
    color: colors.green[400],
    fontSize: 30,
  },
}));

type DateButtonProps = {
  diff: number;
  onClick: Function;
};

const DateButton = ({ diff, onClick }: DateButtonProps) => {
  const classes = useStyles();
  const { date, recordList } = useSelector((state: State) => state.tracking);

  const momentDate = moment(date, config.dateFormat);
  const myDate = momentDate.add(diff, "days");

  const textColor = diff ? "rgba(255, 255, 255, 0.54)" : "white";
  const fontSize = 18 * (diff ? 0.8 : 1);
  const mainFontSize = 40 * (diff ? 0.8 : 1);
  const lineHeight = diff ? 1.6 : 1.2;

  const showMonth = !diff || !myDate.isSame(date, "month");
  const showYear = !diff || !myDate.isSame(date, "year");

  const allDone = useMemo(() => {
    return (
      recordList.length &&
      recordList.every((record) => {
        return record.done >= record.target;
      })
    );
  }, [recordList]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      borderRadius={10}
      overflow="hidden"
    >
      <ButtonBase onClick={() => onClick()}>
        <Box
          position="relative"
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          borderColor="secondary.main"
          className={classes.dateButtonInner}
        >
          <Typography style={{ color: textColor, fontSize }}>
            {myDate.format("dddd")}
          </Typography>
          <Typography
            style={{ color: textColor, fontSize: mainFontSize, lineHeight }}
          >
            {myDate.format("D")}
          </Typography>
          <Typography
            style={{
              color: textColor,
              fontSize,
              display: showMonth ? "block" : "none",
            }}
          >
            {myDate.format("MMM")} {showYear && myDate.format("yyyy")}
          </Typography>
          {diff === 0 && allDone ? (
            <CheckIcon className={classes.done} />
          ) : null}
        </Box>
      </ButtonBase>
    </Box>
  );
};

const TrackCalendar = () => {
  const desktop = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { date } = useSelector((state: State) => state.tracking);
  const [isOpen, setIsOpen] = useState(false);

  const isToday = useMemo(() => {
    return (
      Math.abs(
        moment(date).startOf("day").diff(moment().startOf("day"), "day")
      ) < 1
    );
  }, [date]);

  const setDate = (newDate: moment.Moment) => {
    dispatch(trackingActions.setDate(newDate.format(config.dateFormat)));
  };

  const addDate = (diff: number) => {
    const newDate = moment(date, config.dateFormat).add(diff, "days");
    setDate(newDate);
  };

  return (
    <Box position="relative">
      <Box
        display="flex"
        alignItems="center"
        px={2}
        py={1}
        className={classes.calendar}
      >
        <IconButton onClick={() => addDate(-1)}>
          <NavigateBeforeIcon
            fontSize="large"
            className={classes.navigateButton}
          />
        </IconButton>
        <Box flexGrow={1} display="flex" justifyContent="space-evenly">
          {desktop && <DateButton diff={-1} onClick={() => addDate(-1)} />}
          <DateButton diff={0} onClick={() => setIsOpen(true)} />
          {desktop && <DateButton diff={1} onClick={() => addDate(1)} />}
        </Box>
        <IconButton onClick={() => addDate(1)}>
          <NavigateNextIcon
            fontSize="large"
            className={classes.navigateButton}
          />
        </IconButton>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            open={isOpen}
            value={date}
            animateYearScrolling
            className={classes.datePicker}
            onClose={() => setIsOpen(false)}
            onChange={(newDate) => {
              setDate(newDate);
              setIsOpen(false);
            }}
          />
        </MuiPickersUtilsProvider>
      </Box>
      {!isToday && (
        <Box className={classes.todayBtn}>
          <Button color="primary" onClick={() => setDate(moment())}>
            Go To Today
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TrackCalendar;

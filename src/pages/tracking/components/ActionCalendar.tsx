import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ButtonBase,
  Box,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";

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
}));

type DateButtonProps = {
  date: moment.Moment;
  diff: number;
  onClick: Function;
};

const DateButton = (props: DateButtonProps) => {
  const { date, diff, onClick } = props;
  const classes = useStyles();

  const myDate = moment(date).add(diff, "days");
  const textColor = diff ? "rgba(255, 255, 255, 0.54)" : "white";
  const fontSize = 18 * (diff ? 0.8 : 1);
  const mainFontSize = 40 * (diff ? 0.8 : 1);
  const lineHeight = diff ? 1.6 : 1.2;

  const showMonth = !diff || !myDate.isSame(date, "month");
  const showYear = !diff || !myDate.isSame(date, "year");

  return (
    <Box
      display="flex"
      justifyContent="center"
      borderRadius={10}
      overflow="hidden"
    >
      <ButtonBase onClick={() => onClick()}>
        <Box
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
        </Box>
      </ButtonBase>
    </Box>
  );
};

const ActionCalendar = () => {
  const desktop = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const today = moment().startOf("day");
  const [date, setDate] = useState(moment(today));
  const [isOpen, setIsOpen] = useState(false);

  const addDate = (diff: number) => {
    setDate((prev) => moment(prev).add(diff, "days"));
  };

  return (
    <Box>
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
          {desktop && (
            <DateButton date={date} diff={-1} onClick={() => addDate(-1)} />
          )}
          <DateButton date={date} diff={0} onClick={() => setIsOpen(true)} />
          {desktop && (
            <DateButton date={date} diff={1} onClick={() => addDate(1)} />
          )}
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
      <Box display="flex" justifyContent="flex-end" p={1} pb={0}>
        <Button
          color="primary"
          onClick={() => setDate(moment(today))}
          disabled={Math.abs(date.diff(today, "day")) < 1}
        >
          Go To Today
        </Button>
      </Box>
    </Box>
  );
};

export default ActionCalendar;

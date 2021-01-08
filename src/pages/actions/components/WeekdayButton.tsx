import { Box, makeStyles, Button, Typography } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";

type StyleProps = {
  active: boolean;
};

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    paddingBottom: "100%",
    position: "relative",
  },
  innerWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonRoot: {
    width: "100%",
    minWidth: 0,
    height: "100%",
    borderWidth: 4,
    borderStyle: "solid",
    borderRadius: "50%",
    borderColor: ({ active }: StyleProps) =>
      active ? colors.deepPurple[900] : colors.grey[300],
    backgroundColor: ({ active }: StyleProps) =>
      active ? colors.deepPurple[500] : colors.grey[200],
    "&:hover, &:focus": {
      backgroundColor: ({ active }: StyleProps) =>
        active ? colors.deepPurple[400] : colors.grey[100],
    },
  },
  text: {
    fontSize: 18,
    textTransform: "capitalize",
    color: ({ active }: StyleProps) => (active ? "white" : colors.grey[500]),
  },
});

type Props = {
  weekday: string;
  active: boolean;
  onSelect: Function;
};

const ColorButton = ({ weekday, active, onSelect }: Props) => {
  const classes = useStyles({ active });

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.innerWrapper}>
        <Button
          classes={{ root: classes.buttonRoot }}
          onClick={() => onSelect()}
        >
          <Typography className={classes.text}>{weekday}</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ColorButton;

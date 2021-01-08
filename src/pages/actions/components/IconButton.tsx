import { Box, makeStyles, Icon, Button } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";

import { Color } from "../../../redux/redux";
import { shades } from "../../../utils/theme";

type StyleProps = {
  color: string;
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
    position: "relative",
    width: "100%",
    minWidth: 0,
    height: "100%",
    borderWidth: 4,
    borderStyle: "solid",
    borderRadius: "50%",
    borderColor: ({ color }: StyleProps) => colors[color][shades.actionDark],
    backgroundColor: ({ color }: StyleProps) => colors[color][shades.actionBg],
    "&:hover": {
      backgroundColor: ({ color }: StyleProps) =>
        colors[color][shades.actionBg],
      borderColor: ({ color }: StyleProps) =>
        colors[color][shades.actionBorder],
    },
  },
  icon: {
    color: ({ color }: StyleProps) => colors[color][shades.actionBorder],
    fontSize: 30,
  },
  checkIcon: {
    display: ({ active }: StyleProps) => (active ? "block" : "none"),
    position: "absolute",
    zIndex: 1,
    right: -10,
    bottom: -10,
    width: 24,
    height: 24,
    borderRadius: "50%",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "white",
    backgroundColor: colors.green["A700"],
  },
});

type Props = {
  icon: string;
  color: Color;
  selected?: string;
  onSelect?: Function;
};

const IconButton = ({ icon, color, selected, onSelect }: Props) => {
  const active = icon === selected;
  const classes = useStyles({ color, active });

  const onClick = () => {
    if (!active && !!onSelect) onSelect(icon);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.innerWrapper}>
        <Button classes={{ root: classes.buttonRoot }} onClick={onClick}>
          <Icon className={classes.icon}>{icon}</Icon>
          <Box className={classes.checkIcon} />
        </Button>
      </Box>
    </Box>
  );
};

export default IconButton;

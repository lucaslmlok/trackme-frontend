import { Box, makeStyles, Button } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/CheckRounded";
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
    width: "100%",
    minWidth: 0,
    height: "100%",
    borderWidth: 4,
    borderStyle: "solid",
    borderRadius: "50%",
    borderColor: ({ active, color }: StyleProps) =>
      active
        ? colors.grey[shades.actionBorder]
        : colors[color][shades.actionDark],
    backgroundColor: ({ color }: StyleProps) => colors[color][shades.actionBg],
    "&:hover, &:focus": {
      backgroundColor: ({ color }: StyleProps) =>
        colors[color][shades.actionBg],
      borderColor: ({ active, color }: StyleProps) =>
        active
          ? colors.grey[shades.actionBorder]
          : colors[color][shades.actionBorder],
    },
  },
  icon: {
    color: colors.grey[shades.actionBorder],
    fontSize: 28,
    display: ({ active }: StyleProps) => (active ? "block" : "none"),
  },
});

type Props = {
  color: Color;
  selected: Color;
  onSelect: Function;
};

const ColorButton = ({ color = "grey", selected, onSelect }: Props) => {
  const active = color === selected;
  const classes = useStyles({ color, active });

  const onClick = () => {
    if (!active) onSelect(color);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.innerWrapper}>
        <Button classes={{ root: classes.buttonRoot }} onClick={onClick}>
          <CheckIcon className={classes.icon} />
        </Button>
      </Box>
    </Box>
  );
};

export default ColorButton;

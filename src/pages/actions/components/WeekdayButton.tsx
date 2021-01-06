import {
  Box,
  createStyles,
  Fab,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorButton: {
      padding: 6,
    },
    fab: {},
  })
);

const ColorButton = () => {
  const classes = useStyles();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box className={classes.colorButton}>
      <Fab size={mobile ? "medium" : "medium"} classes={{}}>
        Mon
      </Fab>
    </Box>
  );
};

export default ColorButton;

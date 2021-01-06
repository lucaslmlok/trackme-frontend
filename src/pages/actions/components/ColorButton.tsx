import { Box, createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
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

  return (
    <Box className={classes.colorButton}>
      <Fab
        size="small"
        color="secondary"
        classes={
          {
            // root: classes.fab,
          }
        }
        // className={classes.margin}
      >
        <CheckIcon />
      </Fab>
    </Box>
  );
};

export default ColorButton;

import { Box, createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import * as colors from "@material-ui/core/colors";

type Props = {
  color?: string;
};

const useStyles = makeStyles({
  colorButton: {
    padding: 6,
  },
  fab: {
    backgroundColor: ({ color }: any) => colors[color][300],
    "&:hover, &:focus": {
      backgroundColor: ({ color }: any) => colors[color][500],
    },
  },
  icon: {
    color: "white",
  },
});

const ColorButton = (props: Props) => {
  const { color } = props;
  const classes = useStyles({ color: "green" });

  return (
    <Box className={classes.colorButton}>
      <Fab size="small" classes={{ root: classes.fab }}>
        <CheckIcon className={classes.icon} />
      </Fab>
    </Box>
  );
};

export default ColorButton;

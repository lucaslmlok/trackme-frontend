import { Box, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";

import config from "../utils/config";

type Props = {
  iconColor?: string;
  titleColor?: string;
  size?: string;
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginLeft: 4,
  },
}));

const AppIcon = ({ iconColor, titleColor, size }: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <AssessmentIcon
        style={{
          color: iconColor || theme.palette.primary.main,
          fontSize: size === "large" ? 60 : 40,
        }}
      />
      <Typography
        className={classes.title}
        style={{
          color: titleColor || theme.palette.text.primary,
          fontSize: size === "large" ? 30 : 22,
        }}
      >
        {config.appName}
      </Typography>
    </Box>
  );
};

export default AppIcon;

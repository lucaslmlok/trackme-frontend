import LinearProgress from "@material-ui/core/LinearProgress";
import { createStyles, withStyles, Theme } from "@material-ui/core/styles";

const ProgressBar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  })
)(LinearProgress);

export default ProgressBar;

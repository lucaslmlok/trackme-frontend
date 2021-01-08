import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#D1C4E9",
      main: "#673AB7",
      dark: "#512DA8",
    },
    secondary: {
      light: "#F8BBD0",
      main: "#FF4081",
      dark: "#C2185B",
    },
  },
});

export const circleButtonStyle = {
  root: {
    borderRadius: "50%",
    border: "1px solid",
    width: 40,
    minWidth: 40,
    height: 40,
    "& $label": {
      transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    },
    "&:hover": {
      "& $label": {
        transform: "scale(1.3)",
      },
    },
  },
};

export const shades = {
  actionBg: 200,
  actionDark: 500,
  actionBorder: 900,
};

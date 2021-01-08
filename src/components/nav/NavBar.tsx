import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Link,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";

import config from "../../utils/config";
import AppIcon from "../ui/AppIcon";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: config.drawerWidth,
    width: `calc(100% - ${config.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24,
  },
  menuButton: {
    marginRight: 12,
  },
  menuButtonHidden: {
    display: "none",
  },
}));

type Props = {
  isOpen: boolean;
  isMobile: boolean;
  openDrawer: Function;
};

const NavBar = ({ isOpen, isMobile, openDrawer }: Props) => {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(
        classes.appBar,
        isOpen && !isMobile && classes.appBarShift
      )}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => openDrawer()}
          className={clsx(
            classes.menuButton,
            isOpen && !isMobile && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1}>
          <AppIcon iconColor="white" titleColor="white" />
        </Box>
        <Link href={config.githubProfile} target="_blank" rel="noopener">
          <IconButton>
            <GitHubIcon style={{ color: "white" }} />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

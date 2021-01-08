import clsx from "clsx";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  makeStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import config from "../../utils/config";
import { MainListItems, SecondaryListItems } from "./navListItems";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: config.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

type Props = {
  isOpen: boolean;
  isMobile: boolean;
  pageTitle: string;
  closeDrawer: Function;
};

const NavDrawer = ({ isOpen, isMobile, pageTitle, closeDrawer }: Props) => {
  const classes = useStyles();

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
      }}
      open={isOpen}
      onClose={() => closeDrawer()}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => closeDrawer()}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MainListItems
          currentPage={pageTitle}
          onClick={() => isMobile && closeDrawer()}
        />
      </List>
      <Divider />
      <List>
        <SecondaryListItems />
      </List>
    </Drawer>
  );
};

export default NavDrawer;

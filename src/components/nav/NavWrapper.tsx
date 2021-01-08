import { useState } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Box,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import NavBar from "./NavBar";
import NavDrawer from "./NavDrawer";
import Copyright from "../ui/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  pageTitle: {
    fontWeight: 600,
  },
}));

type Props = {
  pageTitle: string;
  children: any;
};

const NavWrapper = ({ pageTitle, children }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar
        isOpen={isOpen}
        isMobile={mobile}
        openDrawer={() => setOpen(true)}
      />
      <NavDrawer
        isOpen={isOpen}
        isMobile={mobile}
        pageTitle={pageTitle}
        closeDrawer={() => setOpen(false)}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Typography
            component="h1"
            variant="h6"
            color="primary"
            className={classes.pageTitle}
          >
            {pageTitle}
          </Typography>
          <Box pt={2}>{children}</Box>
          <Copyright />
        </Container>
      </main>
    </div>
  );
};

export default NavWrapper;

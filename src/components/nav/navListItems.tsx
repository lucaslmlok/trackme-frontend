import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ListAltIcon from "@material-ui/icons/ListAlt";

import * as authActions from "../../redux/actions/auth";

export const MainListItems = ({ currentPage, onClick }) => {
  const history = useHistory();

  const navigate = (path: string) => {
    history.push(path);
    onClick();
  };

  const pageColor = (page: string): "secondary" | "inherit" => {
    return currentPage === page ? "secondary" : "inherit";
  };

  return (
    <div>
      <ListItem button onClick={() => navigate("/tracking")}>
        <ListItemIcon>
          <PlaylistAddCheckIcon color={pageColor("Tracking")} />
        </ListItemIcon>
        <ListItemText primary="Tracking" />
      </ListItem>

      <ListItem button onClick={() => navigate("/actions")}>
        <ListItemIcon>
          <ListAltIcon color={pageColor("Actions")} />
        </ListItemIcon>
        <ListItemText primary="Actions" />
      </ListItem>

      <ListItem button onClick={() => navigate("/dashboard")}>
        <ListItemIcon>
          <EqualizerIcon color={pageColor("Dashboard")} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={() => navigate("/account")}>
        <ListItemIcon>
          <PersonIcon color={pageColor("Account")} />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [logoutDialog, setLogoutDialog] = useState(false);

  const logout = () => {
    dispatch(authActions.authOut());
    history.push("/");
  };

  return (
    <div>
      <ListItem button onClick={() => setLogoutDialog(true)}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>

      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <DialogTitle>Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={logout} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

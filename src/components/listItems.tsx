import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";

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

  const logout = () => {
    history.push("/");
  };

  return (
    <div>
      {/* <ListSubheader inset>Saved reports</ListSubheader> */}
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
  );
};

import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Icon,
  IconButton,
  Divider,
  makeStyles,
  Theme,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import * as colors from "@material-ui/core/colors";
import moment from "moment";

import { Action, State, Weekday } from "../../../redux/redux";
import useMobile from "../../../hooks/useMobile";
import { shades } from "../../../utils/theme";
import { camelToTitle } from "../../../utils/helper";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  itemIconRoot: {
    minWidth: ({ isMobile }: any) => (isMobile ? 0 : 56),
  },
}));

type Props = {
  deleteList: string[];
  toggleCheckbox: Function;
  onEdit: Function;
  onDelete: Function;
};

const ActionList = ({
  deleteList,
  toggleCheckbox,
  onEdit,
  onDelete,
}: Props) => {
  const isMobile = useMobile("xs");
  const classes = useStyles({ isMobile });
  const { actionList, actionListLoading } = useSelector(
    (state: State) => state.action
  );

  const getWeekdays = (weekdays: Weekday[]) => {
    return weekdays.map((w) => camelToTitle(w)).join(" | ");
  };

  const getPeriod = (action: Action) => {
    let period = `Period: ${moment(action.startDate).format("DD/MM/yyyy")}`;
    if (action.endDate)
      period += ` - ${moment(action.endDate).format("DD/MM/yyyy")}`;
    return period;
  };

  return (
    <>
      {!actionListLoading && (
        <List className={classes.root}>
          {actionList.map((action, index) => (
            <div key={action.id}>
              {index > 0 && <Divider variant="inset" component="li" />}
              <ListItem button>
                <ListItemIcon classes={{ root: classes.itemIconRoot }}>
                  <Checkbox
                    edge={isMobile ? "start" : undefined}
                    checked={deleteList.includes(action.id)}
                    onChange={() => toggleCheckbox(action.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      backgroundColor: colors[action.color][shades.actionDark],
                    }}
                  >
                    <Icon>{action.icon}</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={action.name}
                  secondary={
                    <>
                      <Typography variant="body2" color="textPrimary">
                        {getWeekdays(action.weekdays)}
                      </Typography>
                      {getPeriod(action)}
                    </>
                  }
                  onClick={() => onEdit(action.id)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge={isMobile ? "end" : false}
                    size={isMobile ? "small" : "medium"}
                    aria-label="delete"
                    onClick={() => onDelete(action.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          ))}
          {actionList.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography color="textSecondary">
                      No Actions Available
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginTop: 15 }}
                      onClick={() => onEdit()}
                    >
                      Add One
                    </Button>
                  </Box>
                }
              />
            </ListItem>
          )}
        </List>
      )}
      {actionListLoading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
};

export default ActionList;

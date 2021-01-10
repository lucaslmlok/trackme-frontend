import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Box,
  Button,
  IconButton,
  Typography,
  Popover,
  Icon,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as colors from "@material-ui/core/colors";

import { Record } from "../../../redux/redux";
import * as trackingActions from "../../../redux/actions/tracking";
import { shades } from "../../../utils/theme";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingLeft: 20,
    marginRight: -5,
    height: 80,
  },
  title: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 1.3,
    zIndex: 1,
  },
  iconWrapper: {
    height: 95,
    width: 95,
  },
  icon: {
    fontSize: 55,
  },
  progress: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },
  progressText: {
    marginLeft: "auto",
    marginRight: 5,
    marginTop: 4,
  },
  cardActions: {
    marginTop: -25,
  },
  completed: {
    fontWeight: "bold",
    color: colors.lightGreen[500],
  },
}));

const useProgressStyles = makeStyles((theme) => ({
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
    backgroundColor: ({ color }: any) => colors[color][500],
  },
}));

const getProgress = (target: number, done: number) => {
  const progress = (done / target) * 100;
  return progress > 100 ? 100 : progress;
};

type Props = {
  record: Record;
};

const ActionCard = ({ record }: Props) => {
  const { id, name, type, color, icon, done, target, unit } = record;
  const isDone = done >= target;

  const classes = useStyles();
  const progressClasses = useProgressStyles({ color });
  const history = useHistory();
  const dispatch = useDispatch();
  const progress = getProgress(target, done);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleMore = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  const doneHandler = (type = "done") => {
    dispatch(trackingActions.doneRecord(id, type));
  };

  const editAction = () => {
    history.push(`/actions?type=form&actionId=${id}`);
  };

  return (
    <Card elevation={2}>
      <CardActionArea>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          className={classes.cardMedia}
          style={{ backgroundColor: colors[color][100] }}
        >
          <Typography variant="body1" className={classes.title}>
            {name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            className={classes.iconWrapper}
            style={{ backgroundColor: colors[color][200] }}
          >
            <Icon
              className={classes.icon}
              style={{ color: colors[color][600] }}
            >
              {icon}
            </Icon>
          </Box>
        </Box>
        <CardContent>
          <Box className={classes.progress}>
            <LinearProgress
              variant="determinate"
              classes={progressClasses}
              value={progress}
            />
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.progressText}
            >
              {type === "number"
                ? `${done} / ${target} ${unit}`
                : isDone
                ? "Done"
                : "Not Done"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          m={1}
          className={classes.cardActions}
          display="flex"
          alignItems="center"
          width={1}
        >
          {isDone ? (
            <Typography className={classes.completed}>Completed</Typography>
          ) : (
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: isDone
                  ? colors.grey[300]
                  : colors[color][shades.actionBorder],
              }}
              disabled={isDone}
              onClick={() => doneHandler()}
            >
              <Box fontWeight="fontWeightBold">Done</Box>
            </Button>
          )}
          <IconButton
            edge="end"
            color="primary"
            style={{ marginLeft: "auto" }}
            onClick={handleMore}
            aria-describedby={popoverId}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Popover
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List component="nav" aria-label="main mailbox folders">
              {done < target && (
                <ListItem button onClick={() => doneHandler("done-all")}>
                  <ListItemText primary="Done All" />
                </ListItem>
              )}
              {done > 0 && (
                <>
                  <ListItem button onClick={() => doneHandler("undo")}>
                    <ListItemText primary="Undo" />
                  </ListItem>
                  <ListItem button onClick={() => doneHandler("undo-all")}>
                    <ListItemText primary="Undo All" />
                  </ListItem>
                </>
              )}

              <ListItem button onClick={editAction}>
                <ListItemText primary="Edit" />
              </ListItem>
            </List>
          </Popover>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ActionCard;

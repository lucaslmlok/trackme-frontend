import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UndoIcon from "@material-ui/icons/Undo";
import Popover from "@material-ui/core/Popover";
import * as colors from "@material-ui/core/colors";

import ProgressBar from "../../../components/ui/ProgressBar";
import Icon from "@material-ui/core/Icon";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

type Props = {
  name: string;
  type?: "yesNo" | "number";
  target?: number;
  unit?: string;
  increment?: number;
  done?: number;
  color?: string;
  icon?: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // overflow: "unset",
  },
  cardMedia: {
    height: 80,
  },
  iconWrapper: {
    height: 110,
    width: 110,
    // backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  icon: {
    fontSize: 70,
  },
  typography: {
    padding: theme.spacing(2),
  },
  cardActions: {
    marginTop: -10,
  },
}));

const ActionCard = (props: Props) => {
  const { name } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card className={classes.root} elevation={2}>
      <CardActionArea>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          className={classes.cardMedia}
          style={{ backgroundColor: colors.orange[200] }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            className={classes.iconWrapper}
            style={{ backgroundColor: colors.orange[100] }}
          >
            <Icon
              className={classes.icon}
              style={{ color: colors.orange[500] }}
            >
              people
            </Icon>
          </Box>
        </Box>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" color="textPrimary">
              {name}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
              6 / 8 Cups
            </Typography>
          </Box>
          <Box mt={1}>
            <ProgressBar variant="determinate" value={60} />
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
          <Button color="primary" variant="contained">
            <Box fontWeight="fontWeightBold">Done</Box>
          </Button>
          <IconButton
            edge="end"
            color="primary"
            style={{ marginLeft: "auto" }}
            onClick={handleMore}
            aria-describedby={id}
          >
            <MoreVertIcon />
          </IconButton>
          <Popover
            id={id}
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
              <ListItem button>
                <ListItemText primary="Undo" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Undo All" />
              </ListItem>
              <ListItem button>
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

import { Box, makeStyles, Typography } from "@material-ui/core";

type Props = {
  title?: string;
  body?: string;
};

const useStyle = makeStyles(() => ({
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body: {},
}));

const ToastMsg = ({ title, body }: Props) => {
  const classes = useStyle();

  return (
    <Box p={1}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.body}>{body}</Typography>
    </Box>
  );
};

export default ToastMsg;

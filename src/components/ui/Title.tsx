import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Divider } from "@material-ui/core";

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Box mb={2} mt={-1}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
      <Divider />
    </Box>
  );
}

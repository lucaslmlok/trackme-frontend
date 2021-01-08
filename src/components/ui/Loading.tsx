import { Box, LinearProgress } from "@material-ui/core";

import AppIcon from "./AppIcon";

const Loading = () => {
  return (
    <Box
      height="100vh"
      px={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <AppIcon size="large" />
      <Box width={250} maxWidth="100%" my={2}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default Loading;

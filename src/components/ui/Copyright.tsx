import { Box, Typography, Link } from "@material-ui/core";

import config from "../../utils/config";

const Copyright = () => {
  return (
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          href={config.githubProfile}
          target="_blank"
          rel="noopener"
        >
          {config.githubName}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;

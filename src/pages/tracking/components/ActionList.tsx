import { Box, Grid } from "@material-ui/core";

import ActionCard from "./ActionCard";

const ActionList = () => {
  const list = new Array(12).fill("abc");

  return (
    <Box px={4} pt={1} pb={4}>
      <Grid container spacing={4}>
        {list.map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ActionCard name="Drink Water" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActionList;

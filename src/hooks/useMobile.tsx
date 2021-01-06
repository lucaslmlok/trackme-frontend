import { useTheme, useMediaQuery } from "@material-ui/core";

const useMobile = (breakpoint: any = "sm") => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};

export default useMobile;

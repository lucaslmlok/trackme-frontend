import { Box, Typography, makeStyles } from "@material-ui/core";

import useMobile from "../../../hooks/useMobile";
import AppIcon from "../../../components/ui/AppIcon";

const useStyles = makeStyles(() => ({
  banner: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bannerOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(22, 9, 44, 0.6)",
  },
  bannerText: {
    color: "white",
    fontWeight: "bold",
    display: "inline",
    letterSpacing: 2,
  },
  colorBannerText: {
    fontWeight: "bold",
    display: "inline",
    letterSpacing: 2,
  },
  bannerDesc: {
    color: "#ddd",
  },
}));

const AuthBanner = () => {
  const classes = useStyles();
  const isMobile = useMobile();

  return (
    <>
      <Box position="relative" width={1} height={1}>
        <video
          autoPlay
          loop
          muted
          className={classes.banner}
          style={{ display: isMobile ? "none" : "block" }}
        >
          <source src="banner.mp4" type="video/mp4" />
        </video>
        <img
          src="banner.jpg"
          className={classes.banner}
          style={{ display: isMobile ? "block" : "none" }}
        />
        <Box
          className={classes.bannerOverlay}
          px={isMobile ? 4 : 12}
          py={isMobile ? 4 : 8}
        >
          <Box display="flex" width={1} mb={isMobile ? 2 : 6}>
            <AppIcon titleColor="white" size={isMobile ? "default" : "large"} />
          </Box>
          <Typography
            variant="h2"
            className={classes.bannerText}
            style={{ fontSize: isMobile ? 30 : 60 }}
          >
            <Typography
              color="secondary"
              className={classes.colorBannerText}
              style={{ fontSize: isMobile ? 30 : 60 }}
            >
              Track
            </Typography>{" "}
            Your Life
            <br />
            Seamlessly.
          </Typography>
          <Box
            className={classes.bannerDesc}
            mt={isMobile ? 2 : 6}
            style={{
              fontSize: isMobile ? 16 : 20,
              lineHeight: isMobile ? 1.8 : 2,
            }}
          >
            A productivity tools helps people monitor their
            <br />
            and do their best work by being effective.
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AuthBanner;

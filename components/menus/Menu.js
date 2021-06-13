import React from "react";
import { Typography, MenuItem, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";
import { logout } from "@context/auth";

const Menu = ({ drawer }) => {
  const theme = useTheme();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const goToPage = (link) => {
    router.push(link);
  };

  const navLogout = () => {
    logout();
  };

  const MobileRender = () => (
    <>
      <Typography variant="h6" className="title">
        <MenuItem onClick={() => goToPage("/account")}>My Account</MenuItem>
      </Typography>
      <Typography variant="h6" className="title">
        <MenuItem onClick={navLogout}>Logout</MenuItem>
      </Typography>
    </>
  );

  const NavBarMenu = () => (
    <>
      <Typography variant="h6" className="title">
        <MenuItem onClick={() => goToPage("/booking")}>Booking</MenuItem>
      </Typography>
      <Typography variant="h6" className="title">
        <MenuItem onClick={() => goToPage("/user")}>Users</MenuItem>
      </Typography>
    </>
  );

  if (drawer && matches) {
    return <MobileRender />;
  } else if (!drawer && matches) {
    return <NavBarMenu />;
  }

  if (!matches && drawer) return null;

  if (!matches && !drawer)
    return (
      <>
        <NavBarMenu />
        <MobileRender />
      </>
    );
};

export default Menu;

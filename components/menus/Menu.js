import React from "react";
import { Typography, MenuItem, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";
import { logout } from "@context/auth";

const MyMenu = React.memo(({ goToPage, label, selected }) => {
  const capital = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <Typography variant="h6" className="title">
      <MenuItem
        selected={selected === label}
        onClick={() => {
          goToPage(`${label}`);
        }}
      >
        {capital}
      </MenuItem>
    </Typography>
  );
});

const Menu = ({ drawer }) => {
  const theme = useTheme();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [selected, setSelected] = React.useState("");

  const goToPage = (link) => {
    setSelected(link);
    router.push(link);
  };

  const navLogout = () => {
    logout();
  };

  const NavBarMenu = () => (
    <>
      <MyMenu goToPage={goToPage} selected={selected} label={"booking"} />
      <MyMenu goToPage={goToPage} selected={selected} label={"user"} />
      <MyMenu goToPage={goToPage} selected={selected} label={"map"} />
      <MyMenu goToPage={goToPage} selected={selected} label={"account"} />
      <Typography variant="h6" className="title">
        <MenuItem onClick={navLogout}>Logout</MenuItem>
      </Typography>
    </>
  );
  return <NavBarMenu />;
};

export default React.memo(Menu);

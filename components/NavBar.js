import React from "react";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import SwipeableDrawerLeft from "./DrawerLeft";
import Menu from "./menus";

const NavBar = () => {
  return (
    <NavBarStyle position="static">
      <Toolbar className={"toolbar_wrapper"}>
        <IconButton
          edge="start"
          className={"menuButton"}
          color="inherit"
          aria-label="menu"
        >
          <SwipeableDrawerLeft />
        </IconButton>
        <Typography component="div" className={"action_button"}>
          <Menu />
        </Typography>
      </Toolbar>
    </NavBarStyle>
  );
};

export default NavBar;

const NavBarStyle = styled(AppBar)`
  .action_button {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-right: 15px;

    .active {
      color: #4c3a3a;
    }
  }
  .title a {
    color: #0070f3;
    text-decoration: none;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    text-decoration: underline;
  }

  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
  }

  .title,
  .description {
    text-align: center;
  }

  .toolbar_wrapper {
    display: flex;
    padding: 0;
    margin: 0;
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);

    .menuButton {
      margin: 0;
    }
  }
`;

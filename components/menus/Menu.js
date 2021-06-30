import React from "react";
import styled from 'styled-components'
import { Typography, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";

const MyMenu = React.memo(({ goToPage, label, selected }) => {
  const capital = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <Typography variant="h6" className="title">
      <StyledMenuItem
        selected={selected === label}
        onClick={() => {
          goToPage(`${label}`);
        }}
      >
        {capital}
      </StyledMenuItem>
    </Typography>
  );
});

const Menu = ({ drawer }) => {

  const router = useRouter();
  const [selected, setSelected] = React.useState("");

  const goToPage = (link) => {
    setSelected(link);
    router.push(link);
  };

  const NavBarMenu = () => (
    <>
      <MyMenu goToPage={goToPage} selected={selected} label={"booking"} />
      <MyMenu goToPage={goToPage} selected={selected} label={"user"} />
      <MyMenu goToPage={goToPage} selected={selected} label={"map"} />
      <MyMenu goToPage={goToPage} selected={selected} label={"account"} />
    </>
  );
  return <NavBarMenu />;
};

export default React.memo(Menu);


const StyledMenuItem = styled(MenuItem) `
  &&{
    padding-top:20px;
  padding-bottom: 20px;
  }
`;
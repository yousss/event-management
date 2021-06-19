import Head from "next/head";
import React from "react";
import { withAuthSync } from "@context/auth";
import TableUser from "@components/users/tables";
import styled from "styled-components";

const User = () => {
  return (
    <StyledUser>
      <Head>
        <title>User</title>
      </Head>
      <TableUser />
    </StyledUser>
  );
};

export default withAuthSync(User);

const StyledUser = styled.div`
  padding: 10px 10px;
  overflow-x: auto;

  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 360px;
  }
`;

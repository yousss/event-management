import Head from "next/head";
import React from "react";
import { withAuthSync } from "@context/auth";
import TableUser from "@components/users/tables";
import styled from "styled-components";
import SearchInput from "@components/searchInputField";
import { Button } from "@material-ui/core";

const User = () => {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <StyledWrapper>
        <SearchInput />
        <Button className="button">Create User</Button>
      </StyledWrapper>
      <StyledUser>
        <TableUser />
      </StyledUser>
    </>
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

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
  flex-wrap: wrap-reverse;
  width: 100%;

  > div {
    flex-basis: 40%;
    /* min-width: 40%; */
    max-width: 300px;
  }

  .button {
    flex-basis: 20%;
    /* min-width: 20%; */

    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    color: #fff;
    outline: none;
    font-size: 0.8rem;
    height: 36px;

    &:hover {
      background: linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%) !important;
      font-size: 0.8rem;
    }
  }

  ${(props) => props.theme.breakpoints.down("md")} {
    > div {
      flex-basis: 60%;
      min-width: 60%;
    }

    .button {
      flex-basis: 30%;
      min-width: 30%;
    }
  }

  ${(props) => props.theme.breakpoints.down("xs")} {
    > div {
      flex-basis: 100%;
      min-width: 100%;
    }

    .button {
      margin-bottom: 10px;
      flex-basis: 40%;
      min-width: 40%;
    }
  }
`;

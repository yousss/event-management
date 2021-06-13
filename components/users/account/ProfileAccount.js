import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";

const ProfileAccount = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  return (
    <StyledProfileAccount>
      <div className="menu-box">
        <div className="section-wrapper-top">
          <div className="box-menu">Menu Box</div>
        </div>
        <div className="section-wrapper">
          <div className="box-text">Messages</div>
          <div className="badge">30</div>
        </div>
        <div className="section-wrapper">
          <div className="box-text">Invites</div>
          <div className="badge">30</div>
        </div>
        <div className="section-wrapper">
          <div className="box-text">Events</div>
          <div className="badge">30</div>
        </div>
        <div className="section-wrapper">
          <div className="box-text">Account Settings</div>
        </div>
        <div className="section-wrapper">
          <div className="box-text">Statics</div>
        </div>
      </div>
      <div className="profile-picture">
        {loading ? (
          <Skeleton variant="circle">
            <Avatar className="avarta" style={{ height: 200, width: 200 }} />
          </Skeleton>
        ) : (
          <Avatar
            style={{ height: 200, width: 200 }}
            alt="Remy Sharp"
            src="/img/cute-girl.jpg"
            className="avarta"
          />
        )}
        <Typography className="speech" component="div">
          10 year of experiences in managing finanancial reporting and tax
          payments. She exclusively inspired all her co-workers or
          subbordinates. She is easy-going person and inter-personal person.
        </Typography>
        <Typography className="wrapper-info" component="div">
          <Typography className="info" component="div">
            <p>Full name</p>
            <h4>Yoeun Yous</h4>
          </Typography>
          <Typography className="info" component="div">
            <p>Title</p>
            <h4>Head of Information Technology</h4>
          </Typography>
          <Typography className="info" component="div">
            <p>Department</p>
            <h4>Information Technology</h4>
          </Typography>
        </Typography>
      </div>
    </StyledProfileAccount>
  );
};

const StyledProfileAccount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  width: 100%;

  .profile-picture {
    max-width: 70%;
    flex-basis: 70%;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;

    .avarta {
      border: 5px solid #e6a684;
    }
    .speech {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0px 0.7px 0px 0.6px #dcd7d4;
    }

    .wrapper-info {
      display: flex;

      .info {
        flex: 1;
        box-shadow: 1px 2px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 10px;
        margin: 0px 10px;
      }
    }
  }

  .menu-box {
    max-width: 30%;
    flex-basis: 30%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    background: linear-gradient(45deg, #f97d6e 30%, #e6a684 90%);

    .section-wrapper-top,
    .section-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border: 1px solid #fff;
      color: #fff;
      padding: 10px 20px;
      font-size: 1rem;
      box-shadow: inset 0px -2px 2px 0px #7d4e4e;

      &:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      &:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .box-menu {
        width: 100%;
        text-align: center;
      }

      .badge {
        height: 25px;
        width: 45px;
        text-align: center;
        padding: 3px;
        background-color: #f97d6e;
        border-radius: 40%;
        box-shadow: 2px 2px 3px #e6a684;
      }
    }
    .section-wrapper-top {
      text-align: center;
      font-weight: 600;
      font-size: 1.4rem;
    }
  }

  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-flow: column-reverse wrap;

    .profile-picture,
    .menu-box {
      flex-basis: 100%;
      min-width: 100%;
      width: 100%;
      margin: auto;
    }
  }

  ${(props) => props.theme.breakpoints.down("xs")} {
    flex-flow: column-reverse wrap;

    .profile-picture {
      .wrapper-info {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
`;

export default ProfileAccount;

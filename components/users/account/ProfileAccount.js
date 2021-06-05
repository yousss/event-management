import { Avatar } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const ProfileAccount = () => {
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
        <Avatar
          style={{ height: 200, width: 200 }}
          alt="Remy Sharp"
          src="/img/cute-girl.jpg"
          className="avarta"
        />
      </div>
    </StyledProfileAccount>
  )
}

const StyledProfileAccount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  .profile-picture {
    max-width: 33%;
    flex-basis: 33%;
    width: 100%;

    .avarta {
      border: 5px solid #e6a684;
    }
  }

  .menu-box {
    max-width: 33%;
    flex-basis: 33%;
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
`

export default ProfileAccount

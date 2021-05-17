import React from 'react'
import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import styles from '@styles/navBar.module.scss'
import { MenuItem } from '@material-ui/core'
import { logout } from '@context/auth'
import { useRouter } from 'next/router'

const NavBar = () => {
  const router = useRouter()

  const navLogout = () => {
    logout()
  }

  const goToPage = (link) => {
    router.push(link)
  }

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar_wrapper}>
        <IconButton
          edge="start"
          className={styles.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography component="div" className={styles.action_button}>
          <Typography variant="h6" className={styles.title}>
            <MenuItem onClick={() => goToPage('/booking')}>Booking</MenuItem>
          </Typography>
          <Typography variant="h6" className={styles.title}>
            <MenuItem onClick={() => goToPage('/user')}>Users</MenuItem>
          </Typography>
          <Typography variant="h6" className={styles.title}>
            <MenuItem onClick={navLogout}>Logout</MenuItem>
          </Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

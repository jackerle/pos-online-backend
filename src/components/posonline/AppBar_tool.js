import React,{useState} from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory, Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Paper,
  Card, Typography, Button, Box, ListItemAvatar, Avatar, IconButton, Badge,
  ListItemSecondaryAction, ButtonGroup, Container, Dialog, DialogTitle, DialogContent, DialogContentText,
  TextField, DialogActions, CardActionArea, CardMedia, CardContent, AppBar, Toolbar, Chip,
  InputAdornment, TextareaAutosize, InputBase,
} from '@material-ui/core'
import SignOnIcon from '@material-ui/icons/PersonAdd';
import MenuIcon from '@material-ui/icons/FormatListBulleted';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import DownIcon from '@material-ui/icons/GetApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { green, pink } from '@material-ui/core/colors';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//Private Section
import MainMenu from '../real/MainMenu'
import SignOn from '../real/SignOn'
import AlertSignOff from '../real/AlertSignOff'

//css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(.5),
  },
  menuName: {
    marginRight: theme.spacing(14),
    fontSize: '1.2em'
  },
  title: {
    flexGrow: 1,
  },
  store: {
    font: "7Font"
  },
  textbox: {
    font: "7Font",
    width: '20%'
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(green[100]),
    backgroundColor: green[100],
    marginRight: theme.spacing(1),
  },
}));

//Styled Component Section
//InputBase
const InputBaseStyled = styled(InputBase)`
  width: 30%;
  height:1.8rem;
  background:#ffffff;
`;

export default function MainUIRender(props) {

  const { isLogin, handleClickLoginOpen, userInfo, logout } = props

  const classes = useStyles();
  const history = useHistory();
  const [confirmLogout,setConfirmLogout] = useState(false)



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography color="inherit" className={classes.menuName}>
            POS Online Backend
                </Typography>
          <Typography color="inherit" className={classes.title}>

          </Typography>
          {
            isLogin ?
              //Logged in 
              <>
                <Typography color="inherit" className={classes.menuButton}>
                  {userInfo && userInfo.username}
                </Typography>
                <IconButton edge="end" color="inherit" className={classes.menuButton}>
                  <Badge badgeContent={0}
                    variant="dot"
                    color='error'
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}>
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>

                <IconButton edge="end" color="inherit" className={classes.menuButton} onClick={()=>setConfirmLogout(true)}>
                  <Badge badgeContent={0}
                    variant="dot"
                    color='error'
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}>
                    <ExitToAppIcon />
                  </Badge>
                </IconButton>
                
                {/* Confirm Logout */}
                <Dialog
                  open={confirmLogout}
                  onClose={()=>setConfirmLogout(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"ต้องการออกจากระบบหรือไม่"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={()=>setConfirmLogout(false)} color="primary">
                      ไม่ใช่
                    </Button>
                    <Button onClick={()=>{
                      logout()
                      setConfirmLogout(false)
                    }} color="primary" autoFocus>
                      ใช่
                    </Button>
                  </DialogActions>
                </Dialog>
              </>

              :
              //isn't Login
              <IconButton edge="end" color="inherit" className={classes.menuButton} onClick={handleClickLoginOpen}>
                <Badge badgeContent={0}
                  variant="dot"
                  color='error'
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}>
                  <PersonOutlineIcon />
                </Badge>
              </IconButton>
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}
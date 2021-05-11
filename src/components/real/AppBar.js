import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { useHistory , Redirect } from 'react-router-dom';

//Marterial UI Section
import { makeStyles } from '@material-ui/core/styles';
import { 
  Drawer , Grid  , List , ListItem , ListItemIcon , ListItemText , Divider, Paper ,
  Card , Typography , Button , Box , ListItemAvatar , Avatar , IconButton , Badge ,
  ListItemSecondaryAction , ButtonGroup , Container , Dialog , DialogTitle , DialogContent , DialogContentText ,
  TextField , DialogActions , CardActionArea , CardMedia , CardContent , AppBar , Toolbar , Chip ,
  InputAdornment , TextareaAutosize , InputBase ,
} from '@material-ui/core'
import SignOnIcon from '@material-ui/icons/PersonAdd';
import MenuIcon from '@material-ui/icons/FormatListBulleted';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import DownIcon from '@material-ui/icons/GetApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardIcon from '@material-ui/icons/Keyboard';

//Private Section
import MainMenu from '../../components/real/MainMenu'
import SignOn from '../../components/real/SignOn'
import AlertSignOff from '../../components/real/AlertSignOff'

//css
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    store:{
      font: "7Font"
    },
    textbox:{
      font: "7Font",
      width:'20%'
    }
}));

//Styled Component Section
//InputBase
const InputBaseStyled = styled(InputBase)`
  width: 30%;
  height:1.8rem;
  background:#ffffff;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  const history = useHistory();

  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const handleMainMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [isSignOnOpen, setSignOnMenuOpen] = React.useState(false);
  const handleSignOnMenuClick = () => {
    setSignOnMenuOpen(!isSignOnOpen);
  };
  const handleSignOn = () => {
    setSignOnMenuOpen(!isSignOnOpen);

    let user_info={
      id:"5397778",
      name:"วรกต",
      surname:"ตั้งศิริมงคล"
    };

    props.after_signon_callback(user_info);
  };
  const [isSignOffOpen, setSignOffMenuOpen] = React.useState(false);
  const handleSignOffMenuClick = () => {
    setSignOffMenuOpen(!isSignOffOpen);
  };
  const handleSignOff = () => {

    history.push('/');
  };

  const [barcode, setBarcode] = React.useState("");
  function handleKeyDown(e){
    if(e.key == 'Enter'){
      props.onScanBarcode(e.target.value);
      e.preventDefault();

      setBarcode("");
    }
 }

  const handleSuspendClick = () => {
    props.onSuspendItemClick();
  }

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton color="inherit" onClick={handleMainMenuClick}>
                    <MenuIcon></MenuIcon>
                </IconButton>
                {
                  props.user.name==""?
                    <div/>
                  :
                  <InputBaseStyled 
                    placeholder="สแกนบาร์โค้ดสินค้า" 
                    value={barcode} 
                    onChange={e => setBarcode(e.target.value)}
                    onKeyPress={handleKeyDown} 
                  />
                }
                {
                  props.user.name==""?
                    <div/>
                  :
                    <IconButton aria-label="sign on" edge="end" color="inherit"
                      >
                      <KeyboardIcon />
                    </IconButton>
                }
                {
                  props.user.name==""?
                    <div/>
                  :
                    <IconButton aria-label="sign on" edge="end" color="inherit"
                      >
                      <SearchIcon />
                    </IconButton>
                }
                <Typography color="inherit" className={classes.title}>
                </Typography>
                <Typography color="inherit">
                    {props.store_name}
                </Typography>
                {
                  props.user.name==""?
                    <div/>
                  :
                    <IconButton aria-label="sign on" 
                                edge="end" 
                                color="inherit"
                                onClick={handleSuspendClick}
                      >
                      <Badge  badgeContent={props.suspend_item==""?0:1} 
                              color="error" 
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}>
                        <DownIcon />
                      </Badge>
                    </IconButton>
                }
                {
                  props.user.name==""?
                    <div/>
                  :
                    <IconButton aria-label="sign on" edge="end" color="inherit"
                      >
                      <NotificationsIcon />
                    </IconButton>
                }
                {
                  props.user.name==""?
                    <IconButton aria-label="sign on" edge="end" color="inherit"
                      onClick={handleSignOnMenuClick}
                      >
                      <SignOnIcon />
                    </IconButton>
                  :
                    <IconButton aria-label="sign off" edge="end" color="inherit"
                      onClick={handleSignOffMenuClick}
                      >
                      <AccountCircleIcon />
                    </IconButton>
                }
            </Toolbar>
        </AppBar>

        <MainMenu 
          isOpen={isMenuOpen} 
          user={props.user} 
          onMainMenuClose={handleMainMenuClick}
          />

        <SignOn
          isOpen={isSignOnOpen} 
          onSignOnMenuClose={handleSignOnMenuClick}
          onSignOn={handleSignOn}
          />

        <AlertSignOff
          isOpen={isSignOffOpen} 
          onSignOffMenuClose={handleSignOffMenuClick}
          onSignOff={handleSignOff}
          />
    </div>
  );
}
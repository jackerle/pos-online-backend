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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { green, pink } from '@material-ui/core/colors';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

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
      marginRight: theme.spacing(.5),
    },
    menuName: {
      marginRight: theme.spacing(14),
      fontSize:'1.2em'
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
                <Typography color="inherit" className={classes.menuName}>
                  POS Online Backend
                </Typography>
                {/* <IconButton color="inherit" onClick={handleMainMenuClick} className={classes.menuButton}>
                    <MenuIcon></MenuIcon>
                </IconButton> */}
                {/* <Divider orientation="vertical" flexItem className={classes.menuButton} /> */}
                {/* <IconButton color="inherit" className={classes.menuButton}>
                  <SearchIcon />
                </IconButton>
                <Typography color="inherit">
                  Search
                </Typography> */}
                <Typography color="inherit" className={classes.title}>
                </Typography>
                <IconButton edge="end" color="inherit" className={classes.menuButton}>
                  <Badge  badgeContent={0} 
                          variant="dot"
                          color='error'
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}>
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
                {/* <Avatar color="primary" className={classes.small}>วต</Avatar> */}
                {/* <Typography color="inherit">
                  วรกต ตั้งศิริมงคล
                </Typography>
                <IconButton edge="end" color="inherit" className={classes.menuButton}>
                  <ExpandMoreIcon />
                </IconButton> */}
            </Toolbar>
        </AppBar>

        <MainMenu 
          isOpen={isMenuOpen} 
          user={props.user} 
          onMainMenuClose={handleMainMenuClick}
          />

        <AlertSignOff
          isOpen={isSignOffOpen} 
          onSignOffMenuClose={handleSignOffMenuClick}
          onSignOff={handleSignOff}
          />
    </div>
  );
}
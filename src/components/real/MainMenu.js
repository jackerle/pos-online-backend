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
} from '@material-ui/core'

//private
import FaceIcon from '@material-ui/icons/Face';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoneyIcon from '@material-ui/icons/Money';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//Styled Component Section

//private
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
}));

export default function MainUIRender(props) {
  const classes = useStyles();
  const history = useHistory();

  const [isSignOffOpen, setSignOffMenuOpen] = React.useState(false);
  const handleSignOffMenuClick = () => {
    setSignOffMenuOpen(!isSignOffOpen);
  };
  const handleSignOff = () => {

    history.push('/');
  };

  return (
    <div className={classes.root}>
        <Drawer
                anchor="left"
                open={props.isOpen}
                onClose={props.onMainMenuClose}
                >
            <List>
                <ListItem button onClick={props.onMainMenuClose}>
                    <ListItemIcon><ChevronLeftIcon /></ListItemIcon>
                    <ListItemText primary={"ปิดเมนู"} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    {
                      props.user.name==""?
                      <ListItemText primary={""+"ยังไม่ลงชื่อเข้าใช้"} />
                      :<ListItemText primary={""+"พนักงาน : "+props.user.name+" "+props.user.surname} />
                    }
                </ListItem>
                <ListItem disabled button disabled={props.user.name==""}
                    onClick={handleSignOffMenuClick}>
                    <ListItemIcon><LockIcon /></ListItemIcon>
                    <ListItemText primary={"ออกจากระบบ"} />
                </ListItem>
                <Divider />
                <ListItem disabled button>
                    <ListItemIcon><ReceiptIcon /></ListItemIcon>
                    <ListItemText primary={"ยกเลิกใบเสร็จ"} />
                </ListItem>
            </List>
        </Drawer>

        <AlertSignOff
          isOpen={isSignOffOpen} 
          onSignOffMenuClose={handleSignOffMenuClick}
          onSignOff={handleSignOff}
          />
    </div>
  );
}
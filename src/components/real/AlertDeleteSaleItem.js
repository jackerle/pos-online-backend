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
import AssessmentIcon from '@material-ui/icons/Assessment';

//Styled Component Section

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
  // const history = useHistory();

  return (
    <div className={classes.root}>
      <Dialog open={props.isOpen} onClose={props.onMenuNo} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ต้องการยกเลิกสินค้านี้ ใช่หรือไม่</DialogTitle>
        <DialogContent>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onMenuYes} color="primary">
            ใช่
          </Button>
          <Button onClick={props.onMenuNo} color="primary">
            ไม่ใช่
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
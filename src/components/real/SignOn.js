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
import Numpad from '../../components/real/Numpad'

//Styled Component Section
const DialogStyled = styled(Dialog)`
  // width:40rem;
`;

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
        <DialogStyled 
            open={props.isOpen}
            onClose={props.onSignOnMenuClose}
            >
        <DialogTitle id="form-dialog-title">กรุณาคีย์ข้อมูลเพื่อเข้าระบบ</DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={7}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <ListItemIcon>
                    <FaceIcon />
                  </ListItemIcon>
                  <TextField fullWidth='true' id="outlined-basic" label="รหัสพนักงาน" variant="outlined" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <TextField fullWidth='true' id="outlined-password-input" type="password" label="รหัสผ่าน" variant="outlined" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={5}>
              <Numpad/> 
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onSignOn}>
            เข้าสู่ระบบ
          </Button>
        </DialogActions>
      </DialogStyled>
    </div>
  );
}
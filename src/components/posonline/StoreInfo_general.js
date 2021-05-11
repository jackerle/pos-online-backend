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
import ExpandMore from '@material-ui/icons/ExpandMore';
import DownIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';



//css
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
    },
    store:{
        font: "7Font"
    },
    listItemText:{
      fontSize:'1.4em',//Insert your required size
      color:'#438B63'
    },
    listItemDetail:{
      fontSize:'1.2em',//Insert your required size
      fontWeight:'regular',
      color:'#438B63'
    }
}));

//Styled Component Section
const HeaderListStyled = styled(List)`
  // background:orange;
  margin-right:2rem;
`;
const PaperStyled = styled(Paper)`
  width:95%;
  height:80%;
  background:White;
  margin-left:1rem;
  margin-right:1rem;
`;

export default function MainUIRender(props) {
  const classes = useStyles();
  // const history = useHistory();

  return (
    <div className={classes.root}>
      <HeaderListStyled>
        {/* <ListItem>
          
          <ListItemText primary="ภาพรวม"/>
          <ListItemSecondaryAction>
            <IconButton edge="end" color='primary'>
              <DownIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem> */}
      </HeaderListStyled>
      <PaperStyled elevation={0}>
        <List>
          <ListItem>
            <ListItemText primary={props.store_info===undefined?"กรุณากรอกรหัสสาขา":props.store_info.store_id+" "+props.store_info.store_name} classes={{primary:classes.listItemText}}/>
            <ListItemSecondaryAction>
              <ListItem>
                {/* <IconButton edge="end" color='primary' className={classes.menuButton}>
                  <RefreshIcon />
                </IconButton>
                <IconButton edge="end" color='primary' className={classes.menuButton}>
                  <EditIcon />
                </IconButton> */}
              </ListItem>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider/>
        <Grid container>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="รหัสสาขา" />
                <ListItemSecondaryAction>
                  <ListItemText primary={props.store_info===undefined?"":props.store_info.store_id} classes={{primary:classes.listItemDetail}}/>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="วันที่ปฏิบัติงาน" />
                <ListItemSecondaryAction>
                  <ListItemText primary={props.store_info===undefined?"":props.store_info.business_date} classes={{primary:classes.listItemDetail}}/>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="ผลัด" />
                <ListItemSecondaryAction>
                  <ListItemText primary={props.store_info===undefined?"":props.store_info.shift_no} classes={{primary:classes.listItemDetail}}/>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="เครื่อง" />
                <ListItemSecondaryAction>
                  <ListItemText primary={props.store_info===undefined?"":props.store_info.pos_no} classes={{primary:classes.listItemDetail}}/>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </PaperStyled>
    </div>
  );
}
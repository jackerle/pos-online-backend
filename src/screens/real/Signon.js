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
  TextField , DialogActions , CardActionArea , CardMedia , CardContent , AppBar , Toolbar ,
} from '@material-ui/core'

//Private Section
import APPBar from '../../components/real/AppBar'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import logo from '../../static/image/all_one_pos.png';

//css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

//Styled Component Section

export default function MainUIRender(props) {
  const classes = useStyles();
  const history = useHistory();

  let user_info={
    id:"",
    name:"",
    surname:""
  };

  let store_info={
    id:"04275",
    name:"ปุณวิถี 20 ( สุขุมวิท 101 )",
  };

  const { height, width } = useWindowDimensions();

  const handleSignOn = (user) => {
    user_info=user;
    // history.push('/sale');
    history.push({
        pathname: '/sale',
        state: 
        {
          user_info:user_info,
          store_info:store_info
        }
    });
  };

  return (
    <div className={classes.root}>
      <APPBar 
        store_name={"ร้าน 7-Eleven "+store_info.id + " " + store_info.name}
        user={user_info}
        after_signon_callback={handleSignOn}
        >
      </APPBar>
    </div>
  );
}